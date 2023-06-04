<script>
  import Authenticate from "../components/Authenticate.svelte";
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<button
  class="btn btn-outline w-full"
  on:click={() => (window.location.href = "/login")}>Enter</button
>

<style>
</style>
