<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	let ready = false;

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="home">
		<div class="intro" in:fade={{ duration: 300 }}>
			Welcome to Read and Write{$page.data.username ? ', ' + $page.data.username + '.' : '.'}
		</div>
		<div class="description" in:fade={{ duration: 300 }}>A blogging and storytelling site</div>
		<div in:fade={{ duration: 300 }} class="featured">
			<div>Featured Articles</div>
			<a href="/Floyd/Baby's%20First%20Blog%20Post">Baby's First Blog Post by Floyd</a>
		</div>
	</div>
{/if}

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: 40px;
		justify-content: center;
		padding-left: 20px;
		padding-right: 48px;
	}
	.intro {
		margin-top: 40px;
		font-size: 76px;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: fit-content;
		gap: 20px;
	}

	.description {
		font-size: 48px;
		color: lightcoral;
		font-weight: bold;
		font-family: 'Lobster', cursive;
	}

	.featured {
		font-size: 31px;
		display: flex;
		gap: 13px;
		flex-direction: column;
		font-weight: bold;
	}

	.featured div {
		border-bottom: 2px solid black;
		width: fit-content;
		padding-bottom: 8px;
		margin-bottom: 17px;
	}

	a {
		color: black;
		font-size: 20px;
		text-decoration: none;
	}

	a:hover {
		color: lightcoral;
	}
</style>
