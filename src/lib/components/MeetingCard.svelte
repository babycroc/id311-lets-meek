<script lang="ts">
  import AddButton from "./AddButton.svelte";
  import Card from "./Card.svelte";

  import groupData from "../data/groups.json";
  import colorData from "../data/colors.json";
  import type { Color, Group, Meeting } from "../types";

  export let meeting: Meeting;

  const groupIdx: number = groupData.findIndex(
    (group: Group) => group.id == meeting.groupId
  );
  console.log(groupIdx);
  const color: Color = colorData[groupIdx];

  const formatTime = (colIdx: number) => {
    const hours = ("0" + (Math.floor(colIdx / 2) % 12)).slice(-2);
    const minutes = colIdx % 2 == 0 ? "00" : "30";
    const apm = Math.floor(colIdx / 2) < 12 ? "AM" : "PM";
    return hours + ":" + minutes + apm;
  };
</script>

<Card background={color.background} border={color.main}>
  <h1>{meeting.name}</h1>
  <p>{formatTime(meeting.colStart)} ~ {formatTime(meeting.colEnd)}</p>
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
