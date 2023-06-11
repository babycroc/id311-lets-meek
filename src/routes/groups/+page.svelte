<script lang="ts">
  import GroupCard from "$lib/components/GroupCard.svelte";
  import AddButton from "../../lib/components/AddButton.svelte";

  import groupData from "../../lib/data/groups.json";

  const colors: { background: string; main: string; hover: string }[] = [
    {
      background: "var(--light-purple)",
      main: "var(--purple)",
      hover: "var(--hover-purple)",
    },
    {
      background: "var(--light-blue)",
      main: "var(--blue)",
      hover: "var(--hover-blue)",
    },
    {
      background: "var(--light-orange)",
      main: "var(--orange)",
      hover: "var(--hover-orange)",
    },
  ];
  const groups: string[] = groupData.map((group) => group.name);

  const addGroup = () => {
    console.log("Add Group!");
  };
</script>

<svelte:head>
  <title>Groups</title>
</svelte:head>

<div class="list-container">
  {#each groups as group, i}
    <GroupCard {group} color={colors[i % colors.length]} />
  {/each}
</div>
<AddButton fixed onClick={addGroup} />

<style>
</style>
