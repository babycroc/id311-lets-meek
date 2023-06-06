<script>
  import { page } from "$app/stores";
  import Navigator from "../lib/components/Navigator.svelte";
  import "./styles.css";
  import "../app.postcss";
</script>

<div class="app">
  <main>
    <slot />
  </main>
  {#if $page.url.pathname !== "/" && $page.url.pathname !== "/login"}
    <Navigator />
  {/if}
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    max-width: 720px;
    margin: 0 auto;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
