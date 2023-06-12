<script lang="ts">
  import GroupCard from "$lib/components/GroupCard.svelte";
  import AddButton from "../../lib/components/AddButton.svelte";

  import groupData from "../../lib/data/groups.json";
  import colorData from "../../lib/data/colors.json";
  import type { Color, GroupType } from "$lib/types";
  import { onMount } from "svelte";
  import { User } from "../../backend/accountManagement/userClass.js";
  import { Group } from "../../backend/groupManagement/groupClass";

  const colors: Color[] = colorData;
  let groups: Group[] = new Array();
  let user;
  let userId;

  onMount(async () => {
    userId = localStorage.getItem("userID");
    user = await User.getUserById(userId);
    let tmpList = new Array();
    let colorCode = 0;
    for (let groupId of user.groups) {
      let group = await Group.getGroupById(groupId);
      tmpList.push(group);
      localStorage.setItem(group.id, colorCode.toString());
      colorCode = (colorCode + 1) % colors.length;
    }
    groups = tmpList;
  });

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
