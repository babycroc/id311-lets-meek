<script lang="ts">
  import MeetingCard from "$lib/components/MeetingCard.svelte";

  import meetingData from "../../lib/data/meetings.json";
  // import type { Meeting } from "../../lib/types";
  import { onMount } from "svelte";
  import { User } from "../../backend/accountManagement/userClass.js";
  import { Group } from "../../backend/groupManagement/groupClass.js";
  import { Meeting } from "../../backend/meetingManagement/meetingClass";

  let meetings: Meeting[] = new Array();
  let userId;
  let user: User;
  onMount(async () => {
    // userId = localStorage.getItem("userID");
    userId = sessionStorage.getItem("userID");
    user = await User.getUserById(userId);
    let tmpList = new Array();
    for (let meetingId of user.meetings) {
      let meeting = await Meeting.getMeetingById(meetingId);
      tmpList.push(meeting);
    }
    meetings = tmpList;
    console.log(meetings);
  });
</script>

<svelte:head>
  <title>Meetings</title>
</svelte:head>

<div class="list-container">
  {#each meetings as meeting, i}
    <MeetingCard {meeting} />
  {/each}
</div>

<style>
</style>
