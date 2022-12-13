<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	let ready = false;

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="home">
		<div class="intro" in:fade={{ duration: 300 }}>Welcome to Read and Write.</div>
		<div class="description" in:fade={{ duration: 300 }}>A simple blog site</div>
		<div class="more">
			<div in:fly={{ x: -500, duration: 900 }}>Add friends,</div>
			<div in:fly={{ x: -500, duration: 900 }}>leave comments,</div>
			<div in:fly={{ x: -500, duration: 900 }}>suggest edits,</div>
			<div in:fly={{ x: -500, duration: 900 }}>etc.</div>
		</div>
		<button in:fade={{ duration: 300 }}>Go</button>
		<blockquote in:fade={{ duration: 300 }}>
			"You can make anything by writing." <span>C.S. Lewis</span>
		</blockquote>
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

	.more {
		font-size: 31px;
		display: flex;
		gap: 13px;
		flex-direction: column;
	}

	button {
		width: fit-content;
		font-size: 48px;
		padding: 4px 8px;
		background: lightcoral;
		font-family: 'Lobster', cursive;
	}

	blockquote {
		margin-top: 20px;
		font-size: 31px;
		font-style: italic;
		margin-bottom: 20px;
	}

	blockquote span {
		font-style: normal;
		color: lightcoral;
		font-weight: bold;
		margin-left: 13px;
	}
</style>
