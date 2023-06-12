<script lang="ts">
  import AddButton from "./AddButton.svelte";
  import Card from "./Card.svelte";
  import type { Color, Group } from "../types";

  export let group: Group;
  export let color: Color;

  const createMeeting = () => {
    console.log("Create Meeting!");
  };
</script>

<Card background={color.background} border={color.main}>
  <p>{group.name}</p>
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
</Card>

<style>
  p {
    font-size: 20px;
    font-weight: bold;
  }
</style>
