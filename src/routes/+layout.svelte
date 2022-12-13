<script>
	import { tick } from 'svelte';
	import { loginOrRegister } from '../stores.js';

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
			<a href="/demo/dashboard">Demo</a>
			<a href="/about">About</a>
			<a on:click={() => handleLoginOrRegister('login')} href="/auth/login">Login</a>
			<a on:click={() => handleLoginOrRegister('register')} href="/auth/register">Register</a>
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

	a {
		color: white;
		text-decoration: none;
	}

	.links {
		text-align: right;
	}

	.links a {
		margin-left: 13px;
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
