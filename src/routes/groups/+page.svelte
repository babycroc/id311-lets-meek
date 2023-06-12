<script lang="ts">
  import GroupCard from "$lib/components/GroupCard.svelte";
  import AddButton from "../../lib/components/AddButton.svelte";

  import groupData from "../../lib/data/groups.json";
  import colorData from "../../lib/data/colors.json";
  import type { Color, Group } from "$lib/types";

  const colors: Color[] = colorData;
  const groups: Group[] = groupData;

  const newGroup = () => {
    console.log("New Group!");
    window.location.href = "/groups/new";
  };
</script>

<div class="list-container">
  {#each groups as group, i}
    <GroupCard {group} color={colors[i % colors.length]} />
  {/each}
</div>
<AddButton fixed onClick={newGroup} />

<style>
</style>
