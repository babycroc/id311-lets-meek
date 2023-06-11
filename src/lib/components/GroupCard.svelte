<script lang="ts">
  import AddButton from "./AddButton.svelte";
  import Card from "./Card.svelte";

  export let group: string;
  export let color: { background: string; main: string; hover: string };

  const createMeeting = () => {
    console.log("Create Meeting!");
  };
</script>

<Card background={color.background} border={color.main}>
  <p>{group}</p>
  <div class="right-align">
    <AddButton
      color="white"
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
