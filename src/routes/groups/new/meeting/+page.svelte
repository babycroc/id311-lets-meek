<script lang="ts">
  import Map from "$lib/components/Map.svelte";
  import { formatTime, formatWeekday } from "$lib/utils";
  import { onMount } from "svelte";
  import { Group } from "../../../../backend/groupManagement/groupClass";
  import { Meeting } from "../../../../backend/meetingManagement/meetingClass";
  import { Place } from "../../../../backend/map/placeClass";
  import ScheduleTable from "$lib/components/ScheduleTable.svelte";

  let step: "name" | "time" | "place" = "name";
  let placeType: "quiet" | "moderate" | "loud" | null = null;

  let createMeetingMsg: string = "";

  let meetingName: string = "";
  let wday: string = "Monday";
  let startH: number = 2;
  let startM: number = 30;
  let endH: number = 4;
  let endM: number = 0;

  let group;
  let groupID;
  onMount(async () => {
    // user = JSON.parse(localStorage.getItem("user"));
    // groupID = localStorage.getItem("groupID");
    groupID = sessionStorage.getItem("groupID");
    if (groupID) {
      await Group.getGroupById(groupID).then((data) => {
        group = data;
      });
    }
  });

  const createMeeting = async () => {
    console.log(meetingName);
    if (step === "name") {
      if (!meetingName) {
        createMeetingMsg = "Write a meeting name";
      } else {
        createMeetingMsg = "";
        step = "time";
      }
    } else if (step === "time") {
      if (wday === "" || startH < 0 || startM < 0 || endH < 0 || endM < 0) {
        createMeetingMsg = "Select a meeting time";
      } else {
        createMeetingMsg = "";
        step = "place";
      }
    } else if (step === "place") {
      if (lat === "" || lon === "") {
        createMeetingMsg = "Select a meeting location";
      } else {
        createMeetingMsg = "";
        await Meeting.createNewMeeting(
          group,
          meetingName,
          { x: lat, y: lon },
          wday,
          startH,
          startM,
          endH,
          endM
        );
        window.location.href = "/meetings";
      }
    }
  };

  const getLocation = (type: string) => {
    Place.findSuggestedPlacesForGroup(group, wday, startH, startM).then(
      (data) => {
        const placeList = data;
        const index = type === "quiet" ? 0 : type === "moderate" ? 1 : 2;
        let place;
        Place.getPlaceById(data[index]).then((data) => {
          place = data;
          console.log(data);
          lat = place.location.x;
          lon = place.location.y;
        });
      }
    );
  };
</script>

<div>
  <div class="form-control list-container">
    {#if step === "name"}
      <h1 class="text-xl text-center">Meeting Name</h1>
      <input
        type="text"
        bind:value={meetingName}
        class="input input-bordered w-full"
      />
      <button class="btn btn-outline w-full" on:click={createMeeting}
        >Next</button
      >
      <p class="error">{createMeetingMsg}</p>
    {/if}

    {#if step === "time"}
      <h1 class="text-xl text-center">Select Time</h1>
      <ScheduleTable handleClick={() => {
        step = "place";
      }}></ScheduleTable>
    {/if}

    {#if step === "place"}
      <h1 class="text-xl text-center">Select Place</h1>
      <Map
        center={{ lat: 36.3742791, lng: 127.3603806 }}
        zoom={16}
        places={true}
        placeList={Place.findSuggestedPlacesForGroup(
          group,
          wday,
          startH,
          startM
        )}
        {placeType}
        --height="400px"
      />

      <div class="flex-row">
        <div class="button-stretch">
          <button
            class="btn btn-primary btn-outline w-full {placeType === 'quiet'
              ? 'btn-active'
              : ''}"
            on:click={() => {
              placeType = "quiet";
              getLocation(placeType);
              console.log(placeType);
            }}>Quiet</button
          >
        </div>
        <div class="button-stretch">
          <button
            class="btn btn-primary btn-outline w-full {placeType === 'moderate'
              ? 'btn-active'
              : ''}"
            on:click={() => {
              placeType = "moderate";
              getLocation(placeType);
              console.log(placeType);
            }}>Moderate</button
          >
        </div>
        <div class="button-stretch">
          <button
            class="btn btn-primary btn-outline w-full {placeType === 'loud'
              ? 'btn-active'
              : ''}"
            on:click={() => {
              placeType = "loud";
              getLocation(placeType);
              console.log(placeType);
            }}>Loud</button
          >
        </div>
      </div>

      <button class="btn btn-outline w-full" on:click={createMeeting}
        >Create Meeting</button
      >
      <p class="error">{createMeetingMsg}</p>
    {/if}
  </div>
</div>

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex: 1;
  }

  .form-control {
    width: 100%;
    padding: 16px;
  }

  .button-stretch {
    flex: 1;
  }
</style>
