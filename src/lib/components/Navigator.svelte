<script>
  import { page } from "$app/stores";
</script>

<div class="btm-nav">
  <button
    class={`${
      $page.url.pathname === "/schedule" ? "active" : ""
    } bg-purple-100 text-purple-700`}
    on:click={() => (window.location.href = "/schedule")}
  >
    <i class="fa-regular fa-calendar-days" />
  </button>
  <button
    class={`${
      $page.url.pathname === "/" ? "active" : ""
    } bg-purple-100 text-purple-700`}
    on:click={() => (window.location.href = "/")}
  >
    <i class="fa-solid fa-house" />
  </button>
  <button
    class={`${
      $page.url.pathname.startsWith("/groups") ? "active" : ""
    } bg-purple-100 text-purple-700`}
    on:click={() => (window.location.href = "/groups")}
  >
    <i class="fa-solid fa-user-group" />
  </button>
</div>

<style>
</style>
