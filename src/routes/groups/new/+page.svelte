<script lang="ts">
  import { onMount } from "svelte";
  import { User } from "../../../backend/accountManagement/userClass.js";
  import { Group } from "../../../backend/groupManagement/groupClass.js";
  let type: "join" | "create" = "join";
  let groupName: string = "";
  let groupCode: string = "";

  let userId;
  let user: User;
  let joinResult: boolean = true;
  let createGroupMsg: string = "";
  onMount(async () => {
    userId = localStorage.getItem("userID");
    user = await User.getUserById(userId);
  });

  const handleClick = async () => {
    if (type == "join") {
      console.log("Group code:", groupCode);
      joinResult = await user.joinGroupByCode(groupCode);
      if (joinResult) {
        window.location.href = "/groups";
      }
    }
    if (type == "create") {
      console.log("Group name:", groupName);
      if (groupName) {
        await Group.createNewGroup(user, groupName);
        window.location.href = "/groups";
      } else {
        createGroupMsg = "Please input the a new for the new group!";
      }
    }
  };
</script>

<div class="flex-row">
  <div class="button-stretch">
    <button
      class="btn btn-primary btn-outline w-full {type === 'join'
        ? 'btn-active'
        : ''}"
      on:click={() => {
        type = "join";
        joinResult = true;
      }}>Join</button
    >
  </div>
  <div class="button-stretch">
    <button
      class="btn btn-primary btn-outline w-full {type === 'create'
        ? 'btn-active'
        : ''}"
      on:click={() => {
        type = "create";
        createGroupMsg = "";
      }}>Create</button
    >
  </div>
</div>

<div class="center">
  <div class="form-control list-container">
    {#if type === "join"}
      <h1 class="text-xl text-center">Group Code</h1>
      <input
        type="text"
        bind:value={groupCode}
        class="input input-bordered w-full"
      />
      <button class="btn btn-outline w-full" on:click={handleClick}>Join</button
      >
      {#if !joinResult}
        <p>Join failed, please check your group code!</p>
      {/if}
    {/if}

    {#if type === "create"}
      <h1 class="text-xl text-center">Group Name</h1>
      <input
        type="text"
        bind:value={groupName}
        class="input input-bordered w-full"
      />
      <button class="btn btn-outline w-full" on:click={handleClick}
        >Create</button
      >
      <p>{createGroupMsg}</p>
    {/if}
  </div>
</div>

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex: 1;
  }

  .form-control {
    width: 100%;
    padding: 16px;
  }

  .button-stretch {
    flex: 1;
  }
</style>
