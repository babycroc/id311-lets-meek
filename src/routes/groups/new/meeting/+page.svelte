<script lang="ts">
  import Map from "$lib/components/Map.svelte";
  import { formatTime, formatWeekday } from "$lib/utils";
  import { onMount } from "svelte";
  import { Group } from "../../../../backend/groupManagement/groupClass";
  import { Meeting } from "../../../../backend/meetingManagement/meetingClass";
  import { Place } from "../../../../backend/map/placeClass";

  let step: "time" | "place" = "time";
  let placeType: "quiet" | "moderate" | "loud" | null = "quiet";

  let createMeetingMsg: string = "";

  let group;
  let groupID;
  onMount(async () => {
    // user = JSON.parse(localStorage.getItem("user"));
    groupID = localStorage.getItem("groupID");
    if (groupID) {
      await Group.getGroupById(groupID).then((data) => {
        group = data;
      });
    }
  });

  let wday: string = "Monday";
  let startH: number = 2;
  let startM: number = 30;
  let endH: number = 4;
  let endM: number = 0;
  const createMeeting = async () => {
    // await Meeting.createNewMeeting(
    //   group,
    //   name,
    //   { x: x, y: y },
    //   wday,
    //   startH,
    //   startM,
    //   endH,
    //   endM
    // );
    // window.location.href = "/groups";
  };
</script>

<div>
  <div class="form-control list-container">
    {#if step === "time"}
      <h1 class="text-xl text-center">Select Time</h1>
      <p>
        Selected time:
        <b>
          {wday}
          {startH}:{(startM + "0").slice(0, 2)}
          {startH < 12 ? "AM" : "PM"} ~ {endH}:{(endM + "0").slice(0, 2)}
          {endH < 12 ? "AM" : "PM"}
        </b>
      </p>
      (Place to put schedule)
      <button
        class="btn btn-outline w-full"
        on:click={() => {
          step = "place";
        }}>Next</button
      >
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
