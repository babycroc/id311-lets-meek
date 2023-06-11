<script lang="ts">
  export let position: string;
  export let onClick: () => void;
</script>

<button
  class="custom-button"
  style:position={position == "bottom" ? "absolute" : "none"}
  style:right={position == "bottom" ? "16px" : ""}
  style:bottom={position == "bottom" ? "80px" : ""}
  on:click={onClick}
  on:keypress={() => {}}
>
  <slot />
</button>

<style>
</style>
