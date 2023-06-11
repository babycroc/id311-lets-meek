<script>
	import { handleLogin, handleRegister } from "../../backend/accountManagement/authenticate.js";
	let email = "";
    let password = "";
    let confirmPass = "";
    let error = false;  // whether show the error or not
    let register = false;  // checking register screen or login screen
    let authenticating = false;
	let user;

	async function handleAuthenticate() {
		if (authenticating) {
            return;
        }
        if (!email || !password || (register && !confirmPass)) {
            error = true;
            return;
        }
        authenticating = true;
		try {
            if (!register) {
                user = await handleLogin(email, password);
            } else {
                user = await handleRegister(email, password, confirmPass);
            }
			authenticating = false;
			console.log("This is the user:", user.id);
        } catch (err) {
            console.log("There was an authentication error", err);
            error = true;
            authenticating = false;
        }
	}

	function changeRegister() {
		register= !register;
	}
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="authContainer">
    <form>
        <h1>{register ? "Register" : "Login"}</h1>
        {#if error}
            <p class="error">The information you have entered is not correct</p>
        {/if}
		<div class="form-control">
			<label>
				<input bind:value={email} type="email" placeholder="Email" class="input input-bordered input-primary w-full max-w-xs" />
			</label>
		</div>
		<div class="form-control">
			<label>
				<input bind:value={password} type="password" placeholder="Password" class="input input-bordered input-primary w-full max-w-xs" />
			</label>
		</div>
        {#if register}
		<div class="form-control">
			<label>
				<input bind:value={confirmPass} type="password" placeholder=" Confirm Password" class="input input-bordered input-primary w-full max-w-xs" />
			</label>
		</div>
        {/if}
		
		<button on:click={handleAuthenticate} type="button" class="btn btn-primary">
			{#if authenticating}
				<i class="loading loading-infinity loading-sm"></i>
            {:else}
                Submit
            {/if}
		</button>
    </form>
	<div class="form-control w-52 flex-1">
		<label class="cursor-pointer label">
		  <span class="label-text">Do you want to sign up?</span> 
		  <input on:click={changeRegister} type="checkbox" class="toggle toggle-secondary" checked />
		</label>
	  </div>
</div>

<style>
    
</style>