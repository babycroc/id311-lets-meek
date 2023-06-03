<script>
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="form-control">
  <label class="label">
    <span class="label-text">Username</span>
  </label>
  <input type="text" class="input input-bordered w-full" />
  <label class="label">
    <span class="label-text">Password</span>
  </label>
  <input type="text" class="input input-bordered w-full" />
  <label class="label" />
  <button
    class="btn btn-outline w-full"
    on:click={() => (window.location.href = "/groups")}>Login</button
  >
</div>

<style>
</style>
