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
  console.log("hi", placeType);

  let map;
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
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.government",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.medical",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.park",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.school",
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
        let mapMarker = new google.maps.Marker({
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

          mapMarker.setMap(null);
          mapMarker = new google.maps.Marker({
            position: mapsMouseEvent.latLng,
            map,
            icon: "/map_marker_main.png",
          });
        });
      }

      if (places) {
        placeData.map(async (placeID, index) => {
          await Place.getPlaceById(placeID).then((place) => {
            const coordinates = {
              lat: parseFloat(place.location.y),
              lng: parseFloat(place.location.x),
            };
            console.log(index);
            let mapMarker = new google.maps.Marker({
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

  export const changeSelectedPlace = (placeType) => {
    if (places) {
      placeData.map(async (placeID, index) => {
        await Place.getPlaceById(placeID).then((place) => {
          const coordinates = {
            lat: parseFloat(place.location.y),
            lng: parseFloat(place.location.x),
          };
          console.log(index);
          let mapMarker;
          mapMarker.setMap(null);
          mapMarker = new google.maps.Marker({
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

  const onClick = (event) => {
    console.log(event);
  };

  onMount(async () => {
    console.log(placeList);
    if (places)
      await placeList.then((data) => {
        placeData = data;
        console.log(data);
      });
    initMap();
  });
</script>

<div id="map" />
{placeType}

<style>
  #map {
    width: 100%;
    height: var(--height, 400px);
  }
</style>
