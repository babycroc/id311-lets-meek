<script lang="ts">
  import GroupCard from "$lib/components/GroupCard.svelte";
  import AddButton from "../../lib/components/AddButton.svelte";

  import groupData from "../../lib/data/groups.json";
  import colorData from "../../lib/data/colors.json";
  import type { Color, Group } from "$lib/types";

  const colors: Color[] = colorData;
  const groups: Group[] = groupData;

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
