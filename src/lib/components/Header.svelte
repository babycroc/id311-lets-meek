<script lang="ts">
  export let title: string;
  export let user: any;
</script>

<div class="custom-header">
  <p>{title}</p>
  {#if user}
    <img src={user.getAvatar()} width="32px" alt="" />
  {/if}
</div>

<style>
  .custom-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    color: white;
    background-color: var(--purple);
    font-size: 24px;
    font-weight: bold;
    padding: 24px;
  }
</style>
