<script>
  import { onMount } from "svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { Place } from "../../backend/map/placeClass";

  // import mapMarker from "../images/map_marker.png";

  export let center;
  export let zoom;
  export let marker = false;
  export let places = false;
  export let placeList = [];
  export let placeType;

  let map;
  let mapMarker = {
    current: "",
    quiet: "",
    moderate: "",
    loud: "",
  };
  let placeData;

  console.log("Passed props:", center, zoom);

  const initMap = () => {
    let loader;
    try {
      loader = new Loader({
        apiKey: "AIzaSyClfz_9KAgoyC0Fv22u_scyUYr5ctjeVJg", //import.meta.env.VITE_GOOGLE_API_KEY,
      });
    } catch (err) {
      console.log("Error in API key:", err);
    }

    loader.load().then(async () => {
      map = await google.maps.importLibrary("maps").then(
        (res) =>
          new res.Map(document.getElementById("map"), {
            center: center,
            zoom: zoom,
            disableDefaultUI: true,
            mapId: "7846b9913cb0a6e9", //import.meta.env.VITE_GOOGLE_MAP_ID,
          })
      );
      map.setOptions({
        clickableIcons: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // let infoWindow = new google.maps.InfoWindow({
      //   content: "Click the map to select a location!",
      //   position: center,
      // });
      // infoWindow.open(map);

      if (marker) {
        mapMarker.current = new google.maps.Marker({
          position: center,
          map,
          icon: "/map_marker_main.png",
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

          mapMarker.current.setMap(null);
          mapMarker.current = new google.maps.Marker({
            position: mapsMouseEvent.latLng,
            map,
            icon: "/map_marker_main.png",
          });
          sessionStorage.setItem(
            "scheduleX",
            mapMarker.current.getPosition().lng()
          );
          sessionStorage.setItem(
            "scheduleY",
            mapMarker.current.getPosition().lat()
          );
        });
      }

      if (places) {
        placeData.map(async (placeID, index) => {
          await Place.getPlaceById(placeID).then((place) => {
            const coordinates = {
              lat: parseFloat(place.location.y),
              lng: parseFloat(place.location.x),
            };
            const type = ["quiet", "moderate", "loud"][index];
            mapMarker[type] = new google.maps.Marker({
              position: coordinates,
              map,
              icon:
                (index === 0 && placeType === "quiet") |
                (index === 1 && placeType === "moderate") |
                (index === 2 && placeType === "loud")
                  ? "/map_marker_main.png"
                  : "/map_marker_gray.png",
            });
          });
        });
      }
    });
  };

  const changeSelectedPlace = (placeType) => {
    if (places) {
      placeData.map(async (placeID, index) => {
        await Place.getPlaceById(placeID).then((place) => {
          const coordinates = {
            lat: parseFloat(place.location.y),
            lng: parseFloat(place.location.x),
          };
          const type = ["quiet", "moderate", "loud"][index];
          mapMarker[type]?.setMap(null);
          mapMarker[type] = new google.maps.Marker({
            position: coordinates,
            map,
            icon:
              (index === 0 && placeType === "quiet") |
              (index === 1 && placeType === "moderate") |
              (index === 2 && placeType === "loud")
                ? "/map_marker_main.png"
                : "/map_marker_gray.png",
          });
        });
      });
    }
  };

  $: if (map) changeSelectedPlace(placeType);

  onMount(async () => {
    if (places) {
      console.log(placeList);
      await placeList.then((data) => {
        placeData = data;
      });
    }
    initMap();
    sessionStorage.setItem("scheduleX", center.lng);
    sessionStorage.setItem("scheduleY", center.lat);
  });
</script>

<div id="map" />

<style>
  #map {
    width: 100%;
    height: var(--height, 400px);
  }
</style>
