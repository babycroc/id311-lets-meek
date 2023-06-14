<script lang="ts">
  import { handleLogout } from "../../backend/accountManagement/authenticate.js";
  export let title: string;
  export let user: any;
</script>

<!-- <div class="custom-header">
  {title}
  {#if user}
    / {user?.email}
  {/if}
</div> -->

<div class="navbar bg-base-100 custom-header-2">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" style="color: white;">{title}</a>
  </div>

  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
      <div class="w-15 rounded-full">
        {#if user}
          <img src={user.getAvatar()} />
        {/if}
      </div>
    </label>
    <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li><a on:click={handleLogout}>Logout</a></li>
    </ul>
  </div>
</div>

<style>
  .custom-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 60px;
    color: white;
    background-color: var(--purple);
    font-size: 24px;
    font-weight: bold;
    padding: 24px;
  }

  .custom-header-2 {
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    width: 100%;
    height: 60px;
    /* color: white; */
    background-color: var(--purple);
    z-index: 1;
    /* font-size: 24px; */
    /* font-weight: bold; */
    /* padding: 24px; */
  }
</style>
