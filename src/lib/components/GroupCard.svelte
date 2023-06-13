<script lang="ts">
  import AddButton from "./AddButton.svelte";
  import Card from "./Card.svelte";
  import type { Color, GroupType } from "../types";
  import type { Group } from "../../backend/groupManagement/groupClass.js";

  export let group: Group;
  export let color: Color;

  const createMeeting = () => {
    console.log("Create Meeting!");
  };
</script>

<Card background={color.background} border={color.main}>
  <div class="flex-row stretch">
    <div class="list-container">
      <p class="group">{group.name}</p>
      <p class="invite">Code: {group.invite}</p>
    </div>
    <div class="right-align">
      <AddButton
        color={color.name}
        background={color.main}
        hover={color.hover}
        onClick={createMeeting}
      >
        Create Meeting
      </AddButton>
    </div>
  </div>
</Card>

<style>
  .group {
    font-size: 20px;
    font-weight: bold;
  }
  .invite {
    font-size: 16px;
    color: gray;
  }
</style>
