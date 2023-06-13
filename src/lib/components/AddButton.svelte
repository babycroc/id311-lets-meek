<script lang="ts">
  // import Button from "./Button.svelte";
  // import AddIcon from "../icons/AddIcon.svelte";

  export let color: string = "purple";
  const bgColor = "bg-" + color + "-700";
  // export let background: string = "var(--light-purple)";
  // export let hover: string = "var(--hover-purple)";
  export let fixed: boolean = false;
  export let onClick: () => void = () => {};
</script>

<!-- <Button
  {fixed}
  {onClick}
  --main-color={color}
  --background-color={background}
  --hover-color={hover}
>
  <AddIcon size={fixed ? 36 : 24} {color} />
  <slot />
</Button> -->

<button
  class="text-xl btn btn-circle {fixed
    ? 'fixed-button btn-primary'
    : 'btn-outline'}"
  on:click={onClick}>+</button
>

<style>
  .fixed-button {
    position: absolute;
    right: 430px;
    bottom: 80px;
  }
</style>
