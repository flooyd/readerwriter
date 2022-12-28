<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	let ready = false;

	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<title>Read and Write</title>
	<meta name="description" content="Read and Write, a writing platform" />
</svelte:head>
{#if ready}
	<div class="home">
		<div class="title">
			Read and Write is a <span style="color: lightcoral">writing</span> platform.
		</div>
		<div class="articles">
			<div class="articlesTitle">Articles</div>
			<div class="article">
				<a href="/Floyd/Template System">Template System</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.home {
		margin: 20px 0px;
		display: flex;
		flex-direction: column;
		gap: 40px;
		justify-content: center;
		padding-left: 20px;
		padding-right: 48px;
	}
	.title {
		font-size: 39px;
		font-family: 'Lobster', cursive;
		background: #eee;
		box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
		border: 3px solid black;
		border-radius: 5px;
		width: fit-content;
		padding: 8px 16px;
	}
	.articles {
		width: fit-content;
		min-height: fit-content;
		box-sizing: content-box;
		padding: 8px;
		padding-right: 20px;
		border-radius: 5px;
	}
	.articlesTitle {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 8px;
		padding-bottom: 8px;
		border-bottom: 3px solid black;
	}
	.article {
		padding: 8px 16px;
		background: #333;
		border-radius: 5px;
		border: 3px solid lightcoral;
	}
	a {
		color: lightcoral;
		font-size: 16px;
		text-decoration: none;
	}

	a:hover {
		color: white;
	}
</style>
