<script>
  import { onMount } from "svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { PUBLIC_GOOGLE_API_KEY } from "$env/static/public";

  // import mapMarker from "../images/map_marker.png";

  export let center;
  export let zoom;

  export const initMap = () => {
    const loader = new Loader({
      apiKey: PUBLIC_GOOGLE_API_KEY,
    });

    loader.load().then(async () => {
      const map = await google.maps.importLibrary("maps").then(
        (res) =>
          new res.Map(document.getElementById("map"), {
            center: center,
            zoom: zoom,
            disableDefaultUI: true,
            mapId: "7846b9913cb0a6e9",
          })
      );

      // let infoWindow = new google.maps.InfoWindow({
      //   content: "Click the map to select a location!",
      //   position: center,
      // });
      // infoWindow.open(map);

      let mapMarker = new google.maps.Marker({
        position: center,
        map,
        icon: "/map_marker.png",
      });

      map.addListener("click", (mapsMouseEvent) => {
        // // Close the current InfoWindow.
        // infoWindow.close();
        // // Create a new InfoWindow.
        // infoWindow = new google.maps.InfoWindow({
        //   position: mapsMouseEvent.latLng,
        // });
        // infoWindow.setContent(
        //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        // );
        // infoWindow.open(map);

        mapMarker.setMap(null);
        mapMarker = new google.maps.Marker({
          position: mapsMouseEvent.latLng,
          map,
          icon: "/map_marker.png",
        });
      });
    });
  };

  // const onClick = (event) => {
  //   console.log(event);
  // };

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
