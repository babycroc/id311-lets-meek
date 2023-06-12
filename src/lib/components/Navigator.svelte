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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="var(--purple)"
        d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
      />
    </svg>
  </button>
  <button
    class={`${
      $page.url.pathname.startsWith("/groups") ? "active" : ""
    } bg-purple-100 text-purple-700`}
    on:click={() => (window.location.href = "/groups")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="var(--purple)"
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
      />
    </svg>
  </button>
  <button
    class={`${
      $page.url.pathname.startsWith("/meetings") ? "active" : ""
    } bg-purple-100 text-purple-700`}
    on:click={() => (window.location.href = "/meetings")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="var(--purple)"
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71-1.42 1.41z"
      />
    </svg>
  </button>
</div>

<style>
  .btm-nav {
    max-width: 720px;
    margin: 0 auto;
  }
</style>
