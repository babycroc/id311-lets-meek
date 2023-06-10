<script>
	let schedule = new Array(19)
		.fill(false)
		.map(() => new Array(7).fill(false));

	let days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	function getTime(i) {
		let time = (i + 6) % 24;
		return time < 10 ? `0${time}:00` : `${time}:00`;
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
						on:mousedown={() => {
							if (i > 0) schedule[i][j] = !schedule[i][j];
						}}
						on:mouseenter={(e) => {
							if (e.buttons > 0 && i > 0)
								schedule[i][j] = !schedule[i][j];
						}}
					/>
				{/each}
			</tr>
		{/each}
	</table>
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
		height: 40px;
		border: 1px solid #ddd;
	}

	.time {
		text-align: right;
		font-weight: normal;
		border: 1px solid #ddd;
		font-size: 12px;
	}

	.hour {
		cursor: pointer;
		user-select: none;
		width: 100px;
		height: 40px;
		border: 1px solid #ddd;
	}

	.hour.selected {
		background-color: rgb(235, 187, 235);
	}
</style>
