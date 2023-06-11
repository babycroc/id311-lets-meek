<script lang="ts">
  import Button from "./Button.svelte";
  import AddIcon from "../icons/AddIcon.svelte";

  export let color: string = "var(--purple)";
  export let background: string = "var(--light-purple)";
  export let hover: string = "var(--hover-purple)";
  export let fixed: boolean = false;
  export let onClick: () => void = () => {};
</script>

<Button
  {fixed}
  {onClick}
  --main-color={color}
  --background-color={background}
  --hover-color={hover}
>
  <AddIcon size={fixed ? 36 : 24} {color} />
  <slot />
</Button>

<style></style>
