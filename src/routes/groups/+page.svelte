<script>
  import AddButton from "../../lib/components/AddButton.svelte";

  const addGroup = () => {
    console.log("Add Group!");
  };
</script>

<svelte:head>
  <title>Groups</title>
</svelte:head>

<AddButton position="bottom" onClick={addGroup} />

<style>
</style>
