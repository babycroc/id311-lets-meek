<script>
  import AddButton from "../../lib/components/AddButton.svelte";

  const addMeeting = () => {
    console.log("Add Meeting!");
  };
</script>

<svelte:head>
  <title>Meetings</title>
</svelte:head>

<AddButton position="bottom" onClick={addMeeting} />

<style>
</style>
