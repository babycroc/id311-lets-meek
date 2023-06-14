<script>
	import AddButton from "../../lib/components/AddButton.svelte";
	import { User } from "../../backend/accountManagement/userClass";
	import { Schedule } from "../../backend/scheduleManagement/scheduleClass";
	import { onMount } from "svelte";
	import { each } from "svelte/internal";

	let currentSchedule;
	let schedule = new Array(7).fill(0).map(() => new Array(48).fill(0));
	let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
	let state = new Array(7).fill(0).map(() => new Array(48).fill("empty-cell"));
	let selectedCol = -1;
	let selectedCount = 0;
	let selectedCells = new Array(48).fill(0);
	let checking = false;

	function getTime(i) {
		let hour = Math.floor(i / 2);
		let minute = (i % 2) * 30;
		hour = hour < 10 ? `0${hour}` : hour;
		minute = minute < 10 ? `0${minute}` : minute;
		return `${hour}:${minute}`;
	}

	function selectCell(i, j) {
		if (selectedCol==-1 || (selectedCol>=0 && selectedCol==i)) {
			if (schedule[i][j].timeStamp == 0)
				(schedule[i][j].timeStamp = -2), (state[i][j] = "undecided"), selectedCol = i, selectedCount++, selectedCells[j]=1;
			else if (schedule[i][j].timeStamp == -2)
				(schedule[i][j].timeStamp = 0), (state[i][j] = "empty-cell"), selectedCount--, selectedCells[j]=0;
			if (selectedCount==0) selectedCol=-1;
			// logSelectedTimes();
		}
		checking = checkContinuous();
	}

	let isDrag = false;
	const beginDrag = () => {
		isDrag = true;
	};
	const endDrag = () => {
		isDrag = false;
	};

	const mouseHandler = (r, c) => (e) => {
		if (isDrag || e.type === "mousedown") {
			selectCell(r, c);
		}
	};

	onMount(async () => {
		// await User.getUserById(localStorage.getItem("userID")).then((data) => {
		await User.getUserById(sessionStorage.getItem("userID")).then((data) => {
			currentSchedule = data.schedule.table;
			schedule = currentSchedule;
			//schedule[0][0].timeStamp = -1;
		});
	});

	function logSelectedTimes() {
		for (let i = 0; i < schedule.length; i++) {
			for (let j = 0; j < schedule[i].length; j++) {
				if (schedule[i][j].timeStamp == -2) {
					let [weekday, hour, minute] = Schedule.indexToTime(i, j);
					console.log(`Day: ${weekday}, Time: ${hour}:${minute}`);
				}
			}
		}
	}

	function checkContinuous() {
		if (selectedCount==1) return true;
		let i = 0;
		let count = 0;
		for (i=0; i<48; i++)
			if (selectedCells[i]==1) break;
		for (let j=i; j<48; j++)
			if (selectedCells[j]==1) count++;
			else break;
		if (count < selectedCount) return false;
		return true;
	}

	function handleAdd() {
		let query = "?";
		for (let i = 0; i<48; i++)
			if (selectedCells[i]==1) {
				let [weekday, sHour, sMinute] = Schedule.indexToTime(selectedCol, i);
				let tmp = `weekday=${weekday}&startHour=${sHour}&startMinute=${sMinute}`;
				query+=tmp;
				break;
			}
		for (let i = 47; i>=0; i--)
			if (selectedCells[i]==1) {
				let [weekday, endHour, endMinute] = Schedule.indexToTime(selectedCol, i+1);
				let tmp = `&endHour=${endHour}&endMinute=${endMinute}`;
				query+=tmp;
				break;
			}
		window.location.href = ("/schedule/add" + query);
	}
</script>

<svelte:window on:mousedown={beginDrag} on:mouseup={endDrag} />
<div class="overflow-x-auto hide-scrollbar">
	<table>
		<thead class="prevent-select">
			<tr>
				<th class="day" />
				{#each days as day}
					<th class="day">{day}</th>
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
	</table>

	{#if selectedCol >= 0 && checking}
		<AddButton fixed onClick={handleAdd} />
	{/if}
</div>

<style>
	table {
		border-collapse: collapse;
	}

	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}

	.prevent-select {
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}

	.empty-cell {
		width: 100px;
		border: 1px solid #ddd;
	}

	.day {
		text-align: center;
		font-weight: bold;
		height: 20px;
		border: 1px solid #ddd;
	}

	.time {
		font-weight: normal;
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
		border: 0px;
	}

	th {
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 1;
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
