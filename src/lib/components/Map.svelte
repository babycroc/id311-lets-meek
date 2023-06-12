<script>
  import { onMount } from "svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { PUBLIC_GOOGLE_API_KEY } from "$env/static/public";

  export let center;
  export let zoom;

  export const initMap = () => {
    const loader = new Loader({
      apiKey: PUBLIC_GOOGLE_API_KEY,
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      new Map(document.getElementById("map"), {
        center: center,
        zoom: zoom,
        mapId: "7846b9913cb0a6e9",
      });
    });
  };

  onMount(() => {
    initMap();
  });
</script>

<div id="map" />

<style>
  #map {
    width: 100%;
    height: var(--height, 400px);
  }
</style>
