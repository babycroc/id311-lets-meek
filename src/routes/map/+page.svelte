<script>
  import { onMount } from "svelte";
  import Map from "$lib/components/Map.svelte";
  import locationStore from "$lib/stores/locationStore";

  let error;
  let center;

  onMount(() => {
    center = $locationStore;
  });

  function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    locationStore.set({ lat, lng });
    center = $locationStore;
    window.location.href = "/map";
  }

  function errorFn() {
    error = "Unable to retrieve your location";
  }
</script>

<div class="flex justify-start items-center w-full flex-col">
  <button
    on:click={() => {
      if (!navigator.geolocation) {
        error = "Geolocation is not supported by your browser";
      } else {
        error = null;
        navigator.geolocation.getCurrentPosition(success, errorFn);
      }
    }}
    class="btn btn-primary btn-sm capitalize"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
  <div class="flex-1 w-full">
    <Map {center} zoom={10} />
  </div>
</div>

<style>
</style>
