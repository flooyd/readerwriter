<script>
	import { tick } from 'svelte';
	import { page } from '$app/stores';
	import { loginOrRegister } from '../stores.js';

	let logoutForm = null;

	const handleLoginOrRegister = async (option) => {
		if ($loginOrRegister === option) {
			return;
		} else {
			$loginOrRegister = null;
			await tick();
			$loginOrRegister = option;
		}
	};
</script>

<div class="layout">
	<nav>
		<div>
			<a class="title" href="/">Read and Write</a>
		</div>
		<div class="links">
			{#if $page.data.auth}
				<a class="username" href={`/${$page.data.username}/dashboard`}>{$page.data.username}</a>
			{/if}
			{#if !$page.data.auth}
				<a on:click={() => handleLoginOrRegister('login')} href="/auth/login">Login</a>
				<a on:click={() => handleLoginOrRegister('register')} href="/auth/register">Register</a>
			{/if}
			{#if $page.data.auth}
				<a href="/auth/logout">Logout</a>
			{/if}
		</div>
	</nav>

	<slot />
</div>

<style>
	.layout {
		background: white;
		height: fit-content;
		font-family: 'Oswald', sans-serif;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		background: #333;
		margin: 0px;
		padding: 8px 20px;
	}

	nav div {
		width: fit-content;
	}

	.title {
		font-size: 25px;
		font-family: 'Lobster', cursive;
	}

	.title:hover {
		color: lightcoral;
	}

	a {
		color: white;
		text-decoration: none;
	}

	.links {
		text-align: right;
		display: flex;
		align-items: center;
	}

	.links a {
		margin-left: 13px;
	}

	.links a:hover {
		color: lightcoral;
	}

	.username {
		font-weight: bold;
		color: lightcoral;
		font-size: 20px;
	}

	.links a.username:hover {
		color: white;
	}

	@media screen and (max-width: 550px) {
		.title {
			font-size: 16px;
		}

		.links a {
			font-size: 13px;
		}
	}
</style>
