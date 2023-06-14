<script lang="ts">
  import AddButton from "./AddButton.svelte";
  import Card from "./Card.svelte";

  import groupData from "../data/groups.json";
  import colorData from "../data/colors.json";
  import type { Color } from "../types";
  import { formatTime } from "../utils";
  import type { Meeting } from "../../backend/meetingManagement/meetingClass";
  import { Place } from "../../backend/map/placeClass";
  import { onMount } from "svelte";
  import { Group } from "../../backend/groupManagement/groupClass";

  export let meeting: Meeting;

  let groupName;
  let building;
  onMount(async () => {
    await Group.getGroupById(meeting.groupId).then(
      (data) => (groupName = data.name)
    );
    await Place.getPlaceById(meeting.places).then(
      (data) => (building = data.buildingName)
    );
  });

  // const groupIdx: number = groupData.findIndex(
  //   (group: Group) => group.id == meeting.groupId
  // );

  // const groupIdx: number = localStorage.getItem(meeting.groupId);
  const groupIdx: number = sessionStorage.getItem(meeting.groupId);

  console.log(groupIdx);
  const color: Color = colorData[groupIdx];

  function printMeetingTime(timestamp) {
    const date = new Date(Number(timestamp));
    let dateFormat = date.toDateString();
    return dateFormat;
  }
</script>

<Card background={color.background} border={color.main}>
  <h1>{meeting.name}</h1>
  <p>{groupName}</p>
  <p>{building}</p>
  <p>
    {formatTime(meeting.colStart)} ~ {formatTime(meeting.colEnd)}, {printMeetingTime(
      meeting.startTime
    )}
  </p>
</Card>

<style>
  h1 {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }
  p {
    font-size: 16px;
    font-weight: normal;
    color: gray;
  }
</style>
