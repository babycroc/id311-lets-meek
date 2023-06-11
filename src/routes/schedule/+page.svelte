<script>
  import AddButton from "../../lib/components/AddButton.svelte";

  let schedule = new Array(48).fill(false).map(() => new Array(7).fill(false));

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let isCellSelected = false;
  let selectedColumn = null; // Stores the column of the currently selected cell

  function getTime(i) {
    let hour = Math.floor(i / 2);
    let minute = (i % 2) * 30;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    return `${hour}:${minute}`;
  }

  function selectCell(i, j) {
    if (i > 0) {
      schedule[i][j] = !schedule[i][j];
      isCellSelected = schedule.some((day) => day.some((cell) => cell));
      selectedColumn = j; // Store the column of the selected cell
    }
  }

  function dragCell(i, j, e) {
    // Check if the mouse button is pressed and it's the same column as the selected cell
    if (e.buttons > 0 && j === selectedColumn) {
      schedule[i][j] = !schedule[i][j];
    }
  }
</script>

<svelte:head>
  <title>Schedule</title>
</svelte:head>

<section>
  <table>
    <tr>
      <td class="empty-cell" />

      {#each days as day (day)}
        <td class="day">{day}</td>
      {/each}
    </tr>

    {#each schedule as hours, i (i)}
      <tr>
        <td class="time">{getTime(i)}</td>

        {#each hours as hour, j (j)}
          <td
            class="hour {schedule[i][j] ? 'selected' : ''}"
            on:mousedown={() => selectCell(i, j)}
            on:mouseenter={(e) => dragCell(i, j, e)}
          />
        {/each}
      </tr>
    {/each}
  </table>
  {#if isCellSelected}
    <AddButton fixed onClick={() => (window.location.href = "/schedule/add")} />
  {/if}
</section>

<style>
  table {
    border-collapse: collapse;
  }

  .empty-cell {
    width: 50px;
    border: 1px solid #ddd;
  }

  .day {
    text-align: center;
    font-weight: bold;
    height: 20px; /* Reduce height here */
    border: 1px solid #ddd;
  }

  .time {
    text-align: right;
    font-weight: normal;
    border: 1px solid #ddd;
    font-size: 12px;
    height: 20px; /* Reduce height here */
  }

  .hour {
    cursor: pointer;
    user-select: none;
    width: 100px;
    height: 20px; /* Reduce height here */
    border: 1px solid #ddd;
  }

  .hour.selected {
    background-color: var(--purple);
  }

  .btn-circle {
    border: none;
    color: white;
    background-color: var(--purple);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    cursor: pointer;
  }
</style>
