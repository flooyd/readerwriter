<script>
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { loginOrRegister } from '../stores.js';

	let logoutForm = null;
	let showNav = true;

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

<svelte:body
	on:keyup={(e) => {
		console.log(e.key);
		if (e.key === 'Escape') {
			showNav = !showNav;
		}
	}}
/>
<div class="layout">
	{#if showNav}
		<nav transition:fade={{ duration: 100 }}>
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
	{/if}

	<slot class="nonlayout" />
</div>

<style>
	.layout {
		font-family: 'Oswald', sans-serif;
		height: fit-content;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		background: #333;
		margin: 0px;
		padding: 8px 20px;
		height: fit-content;
		box-shadow: 0px 5px 5px 0px rgba(14, 75, 60, 0.75);
		position: sticky;
		z-index: 99999;
		top: 0px;
	}

	nav div {
		width: fit-content;
	}

	.title {
		font-size: 31px;
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
		font-size: 25px;
		padding-right: 20px;
	}

	.links a {
		margin-left: 13px;
	}

	.links a:hover {
		color: lightcoral;
	}

	.links .username {
		font-weight: bold;
		color: lightcoral;
		margin-left: 0px;
	}

	.links a.username:hover {
		color: white;
	}

	@media screen and (max-width: 550px) {
		.title {
			font-size: 25px;
		}

		.links a {
			font-size: 13px;
		}
	}
</style>
