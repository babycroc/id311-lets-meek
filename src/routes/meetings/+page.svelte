<script lang="ts">
  import MeetingCard from "$lib/components/MeetingCard.svelte";
  import AddButton from "../../lib/components/AddButton.svelte";

  import meetingData from "../../lib/data/meetings.json";
  import type { Meeting } from "../../lib/types";

  const meetings: Meeting[] = meetingData;

  const addMeeting = () => {
    console.log("Add Meeting!");
  };
</script>

<svelte:head>
  <title>Meetings</title>
</svelte:head>

<div class="list-container">
  {#each meetings as meeting, i}
    <MeetingCard {meeting} />
  {/each}
</div>
<AddButton fixed onClick={addMeeting} />

<style>
</style>
