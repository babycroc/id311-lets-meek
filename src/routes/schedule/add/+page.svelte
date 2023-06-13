<script>
  import Map from "$lib/components/Map.svelte";
  import { formatTime, prettyPrintTime } from "$lib/utils";
  import { onMount } from "svelte";
  import { User } from "../../../backend/accountManagement/userClass.js";

  let weekday;
  let startHour;
  let startMinute;
  let endHour;
  let endMinute;
  let user;

  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    weekday = urlParams.get('weekday');
    startHour = urlParams.get('startHour');
    startMinute = urlParams.get('startMinute');
    endHour = urlParams.get('endHour');
    endMinute = urlParams.get('endMinute');
  }

  onMount(async () => {
		await User.getUserById(localStorage.getItem("userID")).then((data) => {
			user = data;
		});
	});

  async function handleAdd() {
    const title = document.getElementById('title-input').value;
    const scheduleX = sessionStorage.getItem("scheduleX");
    const scheduley = sessionStorage.getItem("scheduleY");
    await user.addNewFixedFrame(weekday, startHour, startMinute, endHour, endMinute);
    await user.setLocation(weekday, startHour, startMinute, endHour, endMinute, scheduleX, scheduley);
    window.location.href = "/schedule";
  }
</script>

<svelte:head>
  <title>Add Schedule</title>
</svelte:head>

<h1 class="text-xl text-left">{weekday}, {prettyPrintTime(startHour, startMinute, endHour, endMinute)}</h1>

<h1 class="text-xl text-left">Title:</h1>
<input
  id="title-input"
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

<button on:click={handleAdd} type="button" class="btn btn-primary w-full">
  Add
</button>

<style>
</style>
