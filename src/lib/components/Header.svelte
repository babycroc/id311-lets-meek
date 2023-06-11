<script lang="ts">
  export let title: String;
</script>

<div class="custom-header">{title}</div>

<style>
  .custom-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 60px;
    color: white;
    background-color: var(--purple);
    font-size: 24px;
    font-weight: bold;
    padding: 24px;
  }
</style>
