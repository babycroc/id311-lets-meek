<script>
	import AddButton from "../../lib/components/AddButton.svelte";
	import { User } from "../../backend/accountManagement/userClass";
	// import { Schedule } from "../../backend/scheduleManagement";
	import { onMount } from "svelte";
	import { each } from "svelte/internal";

	let currentSchedule;
	let schedule = new Array(7).fill(0).map(() => new Array(48).fill(0));
	let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
	let state = new Array(7)
		.fill(0)
		.map(() => new Array(48).fill("empty-cell"));

	function getTime(i) {
		let hour = Math.floor(i / 2);
		let minute = (i % 2) * 30;
		hour = hour < 10 ? `0${hour}` : hour;
		minute = minute < 10 ? `0${minute}` : minute;
		return `${hour}:${minute}`;
	}

	function selectCell(i, j) {
		if (j >= 0) {
			console.log(i, j);
			if (schedule[i][j].timeStamp == 0)
				(schedule[i][j].timeStamp = -2), (state[i][j] = "undecided");
			else if (schedule[i][j].timeStamp == -2)
				(schedule[i][j].timeStamp = 0), (state[i][j] = "empty-cell");
			isCellSelected = schedule[i].some((cell) => cell === -2);
		}
	}

	function dragCell(i, j, e) {
		if (e.buttons >= 0 && j >= 0) {
			if (schedule[i][j].timeStamp == 0) schedule[i][j].timeStamp = -2;
			else if (schedule[i][j].timeStamp == -2)
				schedule[i][j].timeStamp = 0;
		}
	}
	let isDrag = false;
	const beginDrag = () => {
		isDrag = true;
	};
	const endDrag = () => {
		isDrag = false;
	};
	const toggle = (r, c) => {
		state[r * columns.length + c] = !state[r * columns.length + c];
	};
	const mouseHandler = (r, c) => (e) => {
		console.log(isDrag);
		if (isDrag || e.type === "mousedown") {
			selectCell(r, c);
		}
	};

	onMount(async () => {
		await User.getUserById(localStorage.getItem("userID")).then((data) => {
			currentSchedule = data.schedule.table;
			schedule = currentSchedule;
			//schedule[0][0].timeStamp = -1;
		});
	});

	let isCellSelected = schedule.some((day) =>
		day.some((cell) => cell === -1)
	);
</script>

<svelte:window on:mousedown={beginDrag} on:mouseup={endDrag} />
<section>
	<div class="overflow-x-auto">
		<table class="table table-xs table-pin-rows table-pin-cols">
			<thead>
				<tr>
					<th />
					{#each days as day}
						<td>{day}</td>
					{/each}
					<th />
				</tr>
			</thead>

			<tbody>
				{#each schedule[0] as hour, j}
					<tr>
						<th class="prevent-select">{getTime(j)}</th>
						{#if schedule[0][j].timeStamp != -1}
							<td
								class={state[0][j]}
								on:mousedown={mouseHandler(0, j)}
								on:mouseenter={mouseHandler(0, j)}
							/>
						{:else}
							<td class="hour selected" />
						{/if}

						{#if schedule[1][j].timeStamp != -1}
							<td
								class={state[1][j]}
								on:mousedown={mouseHandler(1, j)}
								on:mouseenter={mouseHandler(1, j)}
							/>
						{:else}
							<td class="hour selected" />
						{/if}

						{#if schedule[2][j].timeStamp != -1}
							<td
								class={state[2][j]}
								on:mousedown={mouseHandler(2, j)}
								on:mouseenter={mouseHandler(2, j)}
							/>
						{:else}
							<td class="hour selected" />
						{/if}

						{#if schedule[3][j].timeStamp != -1}
							<td
								class={state[3][j]}
								on:mousedown={mouseHandler(3, j)}
								on:mouseenter={mouseHandler(3, j)}
							/>
						{:else}
							<td class="hour selected" />
						{/if}

						{#if schedule[4][j].timeStamp != -1}
							<td
								class={state[4][j]}
								on:mousedown={mouseHandler(4, j)}
								on:mouseenter={mouseHandler(4, j)}
							/>
						{:else}
							<td class="hour selected" />
						{/if}

						{#if schedule[5][j].timeStamp != -1}
							<td
								class={state[5][j]}
								on:mousedown={mouseHandler(5, j)}
								on:mouseenter={mouseHandler(5, j)}
							/>
						{:else}
							<td class="hour selected" />
						{/if}

						{#if schedule[6][j].timeStamp != -1}
							<td
								class={state[6][j]}
								on:mousedown={mouseHandler(6, j)}
								on:mouseenter={mouseHandler(6, j)}
							/>
						{:else}
							<td class="hour selected" />
						{/if}
					</tr>
				{/each}
			</tbody>

			<!-- <tr>
			<td class="empty-cell" />

			{#each Array(48).fill(0) as _, i (i)}
				<td class="time">{getTime(i)}</td>
			{/each}
		</tr>

		{#each schedule as day, i (i)}
			<tr>
				<td class="day">{days[i]}</td>

				{#each day as hour, j (j)}
					<td
						class="hour {hour === -1 ? 'selected' : ''}"
						on:mousedown={() => {
							selectCell(i, j), console.log(i, j);
						}}
						on:mouseenter={(e) => dragCell(i, j, e)}
					/>
				{/each}
			</tr>
		{/each} -->
		</table>
	</div>
	{#if isCellSelected}
		<AddButton
			fixed
			onClick={() => (window.location.href = "/schedule/add")}
		/>
	{/if}
</section>

<style>
	table {
		border-collapse: collapse;
	}

	.prevent-select {
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}

	.empty-cell {
		width: 50px;
		border: 1px solid #ddd;
	}

	.day {
		text-align: center;
		font-weight: bold;
		height: 20px;
		border: 1px solid #ddd;
	}

	.time {
		text-align: right;
		font-weight: normal;
		border: 1px solid #ddd;
		font-size: 12px;
		height: 20px;
	}

	.hour {
		cursor: pointer;
		user-select: none;
		width: 100px;
		height: 20px;
		border: 1px solid #ddd;
	}

	.undecided {
		background-color: orange;
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

	.day {
		text-align: center;
		font-weight: bold;
		height: 20px;
		border: 1px solid #ddd;
		position: sticky;
		top: 0;
		background-color: #fff;
	}
</style>
