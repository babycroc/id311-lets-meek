<script lang="ts">
  let type: "join" | "create" = "join";
  let groupName: string = "";
  let groupCode: string = "";

  const handleClick = () => {
    console.log(groupName);
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
