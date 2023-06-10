<script>
	let groupName = "";

	function handleClick() {
		console.log(groupName);
	}
</script>

<div class="center">
	<div class="form-control">
		<h1 class="text-xl mb-4 text-center">Group Name:</h1>

		<input
			type="text"
			bind:value={groupName}
			class="input input-bordered w-full"
		/>

		<button class="btn btn-outline w-full" on:click={handleClick}
			>Enter</button
		>
	</div>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.form-control {
		width: 300px;
	}

	.btn {
		margin-top: 20px;
	}
</style>
