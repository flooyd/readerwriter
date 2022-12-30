<script>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { loginOrRegister } from '../../../stores.js';

	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;

	let username,
		email,
		password = '';

	$: data ? ($loginOrRegister = data.loginOrRegister) : null;
</script>

<svelte:head>
	<title>Read and Write Auth</title>
	<meta name="description" content="The auth page for Read and Write" />
</svelte:head>
<div class="comingSoon">
	<div class="cantRegister">You can't register quite yet.</div>
	<div class="workInProgress">
		Read and Write is a
		<a href="/Floyd/Work%20in%20Progress">work in progress.</a>
	</div>
</div>
{#if $loginOrRegister && data.blah}
	<div class="auth" in:fade={{ duration: 300 }}>
		<div class="title">
			{$loginOrRegister === 'login' ? 'Login' : 'Register'}
		</div>

		<div>
			<a
				on:click={() => ($loginOrRegister = null)}
				href={`/auth/${$loginOrRegister === 'login' ? 'register' : 'login'}`}
				>{$loginOrRegister === 'login' ? 'First time?' : 'Already registered?'}
				<span>{$loginOrRegister === 'login' ? 'Register' : 'Login'}</span>
				<i class="fa-solid fa-arrow-right" /></a
			>
		</div>

		<form use:enhance method="POST" action={'?/' + $loginOrRegister}>
			<label for="email">Email</label>
			<input autocomplete="off" type="text" name="email" bind:value={email} />
			{#if form?.emailRequired}
				<div class="error">{form.emailRequired}</div>
			{/if}
			{#if form?.notEmail}
				<div class="error">{form.notEmail}</div>
			{/if}
			{#if $loginOrRegister === 'register'}
				<label for="username">Username</label>
				<input autocomplete="off" type="text" name="username" bind:value={username} />
				{#if form?.usernameRequired}
					<div class="error">{form.usernameRequired}</div>
				{/if}
				{#if form?.invalidUsername}
					<div class="error">{form.invalidUsername}</div>
				{/if}
			{/if}
			<label for="password">Password</label>
			<input autocomplete="off" type="password" name="password" bind:value={password} />
			{#if form?.passwordRequired}
				<div class="error">{form.passwordRequired}</div>
			{/if}
			{#if form?.invalidPassword}
				<div class="error">{form.invalidPassword}</div>
			{/if}
			{#if form?.notUnique}
				<div class="error">{form.notUnique}</div>
			{/if}
			{#if form?.invalidUser}
				<div class="error">{form.invalidUser}</div>
			{/if}
			<button type="submit">Go</button>
		</form>
	</div>
{/if}

<style>
	.comingSoon {
		margin: 40px auto;
		font-size: 25px;
		height: fit-content;
		min-width: 300px;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
		border: 3px solid black;
		padding: 20px;
		border-radius: 5px;
		background: #eee;
		box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
		user-select: none;
	}
	.cantRegister {
		color: #0e4b3c;
		font-weight: bold;
		text-align: center;
		width: 100%;
	}
	.comingSoon:hover {
		color: white;
		background: #333;
	}
	.comingSoon a {
		color: lightcoral;
	}
	.comingSoon a:hover {
		color: white;
		cursor: pointer;
		padding-bottom: 8px;
		border-bottom: 3px solid lightcoral;
	}
	.auth {
		margin: 40px 0px;
		padding: 0px 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	a {
		color: black;
		text-decoration: none;
		font-style: italic;
		margin-right: 8px;
	}

	a span {
		font-style: normal;
		margin-left: 8px;
		margin-right: 5px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 13px;
		width: 300px;
	}

	input {
		padding: 8px;
	}

	.title {
		font-size: 48px;
		color: lightcoral;
		font-weight: bold;
		font-family: 'Lobster', cursive;
		padding-bottom: 13px;
		border-bottom: 2px solid black;
		width: fit-content;
	}

	button {
		width: fit-content;
		font-size: 48px;
		padding: 4px 8px;
		background: lightcoral;
		font-family: 'Lobster', cursive;
		margin-top: 7px;
	}

	blockquote {
		margin-top: 20px;
		font-size: 20px;
		font-style: italic;
	}

	blockquote span {
		font-style: normal;
		color: lightcoral;
		font-weight: bold;
		margin-left: 13px;
	}

	.error {
		color: red;
	}

	@media screen and (max-width: 550px) {
		blockquote {
			max-width: 300px;
		}
	}
</style>
