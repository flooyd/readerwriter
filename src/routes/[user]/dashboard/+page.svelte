<script>
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let data;

	let ready = false;

	onMount(() => {
		ready = true;
	});

	$: if (data) {
		if (!JSON.parse(data.articles)) {
		} else {
			data.articles = JSON.parse(data.articles);
		}
	}
	console.log(data);
</script>

<div class="dashboard" in:fade={{ duration: 100 }}>
	<div class="user">{data.user}'s Articles ({data.articles.length})</div>
	<form use:enhance method="POST">
		<div class="create">
			<input type="hidden" name="articlesLength" value={data.articles.length} />
			<button formaction="?/createArticle" class="createButton"> New Article </button>
		</div>
	</form>
	{#if ready}
		<div class="articles">
			{#each data.articles as article (article._id)}
				<div in:fade={{ duration: 100 }} class="article">
					<div class="articleTitle">
						{article.title}
					</div>
					<div>{article.content}</div>
					<form use:enhance method="POST">
						<input type="hidden" name="_id" value={article._id} />
						<button formaction="?/deleteArticle">Delete Article</button>
					</form>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dashboard {
		padding: 20px;
	}
	.user {
		font-size: 20px;
		margin-bottom: 13px;
	}
	.article {
		border: 1px solid black;
		margin-bottom: 4px;
		font-size: 16px;
		padding: 8px;
		background: #ccc;
		width: fit-content;
		max-width: 500px;
		border-radius: 5px;
	}
	.article:hover {
		background: #333;
		color: white;
		cursor: pointer;
	}
	.articleTitle {
		font-weight: bold;
	}
	.article div {
		margin-bottom: 4px;
	}
	.create {
		margin-bottom: 13px;
	}
</style>
