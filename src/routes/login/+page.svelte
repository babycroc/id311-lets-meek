<script>
  import {
    handleLogin,
    handleRegister,
  } from "../../backend/accountManagement/authenticate.js";
  let email = "";
  let password = "";
  let confirmPass = "";
  let error = false; // whether show the error or not
  let register = false; // checking register screen or login screen
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
      console.log("This is the user:", user.id);
      if (user) window.location.href = "/groups";
    } catch (err) {
      console.log("There was an authentication error", err);
      error = true;
      authenticating = false;
    }
  }

  function changeRegister() {
    register = !register;
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="authContainer">
  <form>
    <!-- <h1>{register ? "Sign Up" : "Login"}</h1> -->
    <div class="form-control">
      <label>
        <input
          bind:value={email}
          type="email"
          placeholder="Email"
          class="input input-bordered input-primary w-full"
        />
      </label>
    </div>
    <div class="form-control">
      <label>
        <input
          bind:value={password}
          type="password"
          placeholder="Password"
          class="input input-bordered input-primary w-full"
        />
      </label>
    </div>
    {#if register}
      <div class="form-control">
        <label>
          <input
            bind:value={confirmPass}
            type="password"
            placeholder=" Confirm Password"
            class="input input-bordered input-primary w-full"
          />
        </label>
      </div>
    {/if}

    <button
      on:click={handleAuthenticate}
      type="button"
      class="btn btn-primary w-full"
    >
      {#if authenticating}
        <i class="loading loading-infinity loading-sm" />
      {:else}
        Submit
      {/if}
    </button>

    {#if error}
      <p class="error">The information you have entered is not correct</p>
    {/if}
  </form>
  <div class="form-control w-full">
    <label class="cursor-pointer signup-toggle w-full">
      <span class="label-text">Don't have account? Sign up</span>
      <input
        on:click={changeRegister}
        type="checkbox"
        class="toggle toggle-primary"
      />
    </label>
  </div>
</div>

<style>
  .authContainer,
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .signup-toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .error {
    color: var(--red);
  }
</style>
