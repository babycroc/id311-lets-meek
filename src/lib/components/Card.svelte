<script lang="ts">
  export let border: string = "var(--purple)";
  export let background: string = "var(--light-purple)";
  export let onClick: () => void = () => {};
</script>

<div class="custom-card" on:click={onClick} on:keypress={() => {}}>
  <div class="custom-card-border" style:background-color={border} />
  <div class="custom-card-content" style:background-color={background}>
    <slot />
  </div>
</div>

<style>
  .custom-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .custom-card-border {
    border-radius: 16px 0 0 16px;
    width: 8px;
  }
  .custom-card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    border-radius: 0 16px 16px 0;
    padding: 16px 24px;
  }
</style>
