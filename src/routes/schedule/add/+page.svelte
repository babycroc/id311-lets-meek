<script>
  import Map from "$lib/components/Map.svelte";
  import { formatTime, prettyPrintTime } from "$lib/utils";
  import { onMount } from "svelte";

  let weekday;
  let startHour;
  let startMinute;
  let endHour;
  let endMinute;

  // onMount(() => {
  //   const queryString = window.location.search;
  //   console.log("this is query:", queryString);  
  // });
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    weekday = urlParams.get('weekday');
    startHour = urlParams.get('startHour');
    startMinute = urlParams.get('startMinute');
    endHour = urlParams.get('endHour');
    endMinute = urlParams.get('endMinute');
    // console.log(startHour.length);
  }
</script>

<svelte:head>
  <title>Add Schedule</title>
</svelte:head>

<h1 class="text-xl text-left">{weekday}, {prettyPrintTime(startHour, startMinute, endHour, endMinute)}</h1>

<h1 class="text-xl text-left">Title:</h1>
<input
  class="input input-bordered input-primary w-full"
  type="text"
  placeholder="Input title"
/>

<h1 class="text-xl text-left">Place:</h1>
<Map
  center={{ lat: 36.3742791, lng: 127.3603806 }}
  zoom={16}
  marker={true}
  --height="400px"
/>

<button on:click={() => {}} type="button" class="btn btn-primary w-full">
  Add
</button>

<style>
</style>
