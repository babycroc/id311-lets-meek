<script>
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="landing-page">
  <button
    class="btn btn-outline w-full"
    on:click={() => (window.location.href = "/login")}>Enter</button
  >
</div>

<style>
  .landing-page {
    height: 100%;
    width: 100%;
    margin-bottom: -30px;
    background-image: linear-gradient(to bottom, #7e22ce, #b400a7, #ce007f, #d70059, #d40038, #dc344b, #e24e5e, #e86571, #ef8cad, #edb6d9, #eedcf4, #ffffff);
  }
</style>
