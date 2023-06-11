<script lang="ts">
  import Button from "./Button.svelte";
  import AddIcon from "../icons/AddIcon.svelte";

  export let position: string = "";
  export let onClick: () => void = () => {};
</script>

<Button {position} {onClick}>
  <AddIcon size={36} />
</Button>

<style></style>
