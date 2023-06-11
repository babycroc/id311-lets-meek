<script lang="ts">
  export let fixed: boolean = false;
  export let onClick: () => void;
</script>

<button
  class="custom-button"
  class:fixed-button={fixed}
  on:click={onClick}
  on:keypress={() => {}}
>
  <slot />
</button>

<style>
  .custom-button {
    display: flex;
    flex-direction: rox;
    gap: 4px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    padding: 8px;
    color: var(--main-color, var(--purple));
    background-color: var(--background-color, var(--light-purple));
  }
  .custom-button:hover {
    background-color: var(--hover-color, var(--hover-purple));
  }

  .fixed-button {
    position: absolute;
    right: 16px;
    bottom: 80px;
  }
</style>
