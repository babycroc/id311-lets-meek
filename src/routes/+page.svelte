<script>
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="landing-page">
  <h2>Let's</h2>
  <h1>meeK</h1>
  <button
    class="btn btn-outline w-full bg-white"
    on:click={() => (window.location.href = "/login")}>Enter</button
  >
</div>

<style>
  h1,
  h2 {
    font-size: 64px;
    font-weight: bold;
    color: white;
    line-height: 40px;
  }
  h2 {
    font-size: 30px;
  }
  .landing-page {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    /* border: solid 1px black; */
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: 16px;
    /* margin-bottom: -30px; */
    background-image: linear-gradient(
      to bottom,
      #7e22ce,
      #b400a7,
      #ce007f,
      #d70059,
      #d40038,
      #dc344b,
      #e24e5e,
      #e86571,
      #ef8cad,
      #edb6d9,
      #eedcf4,
      #ffffff
    );
  }
  button {
    margin-top: 60px;
    max-width: 200px;
  }
</style>
