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

<div class="center">
	<div class="form-control">
		<h1 class="text-xl mb-4 text-center">Group Name:</h1>

		<input
			type="text"
			bind:value={groupName}
			class="input input-bordered w-full"
		/>

<div class="list-container">
  {#each groups as group, i}
    <GroupCard {group} color={colors[i % colors.length]} />
  {/each}
</div>
<AddButton fixed onClick={addGroup} />

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.form-control {
		width: 300px;
	}

	.btn {
		margin-top: 20px;
	}
</style>
