<script lang="ts">
  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import Navigator from "../lib/components/Navigator.svelte";
  import "./styles.css";
  import "../app.postcss";

  const formatTitle = (text: string) => {
    return text[0].toUpperCase() + text.slice(1);
  };
  const title: string = formatTitle($page.url.pathname.slice(1).split("/")[0]);
</script>

<div class="app">
  <Header {title} />
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
    padding: 24px;
    width: 100%;
    height: calc(100vh - 120px);
    margin: 0 auto;
    overflow-y: scroll;
    background-color: white;
  }
</style>
