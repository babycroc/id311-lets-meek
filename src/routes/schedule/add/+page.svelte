<script>
  import Map from "$lib/components/Map.svelte";
  import { formatTime } from "$lib/utils";
</script>

<svelte:head>
  <title>Add Schedule</title>
</svelte:head>

<h1 class="text-xl text-left">Mon. {formatTime(2)} ~ {formatTime(4)}</h1>

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
  --height="400px"
/>

<button on:click={() => {}} type="button" class="btn btn-primary w-full">
  Add
</button>

<style>
</style>
