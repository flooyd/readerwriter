<script>
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	let ready = false;
	let filter = '';
	let preparedArticles;

	onMount(() => {
		ready = true;
	});

	$: if (data) {
		if (!JSON.parse(data.articles)) {
		} else {
			data.articles = JSON.parse(data.articles);
			preparedArticles = data.articles;
			sortByUpdatedAt();
		}
	}

	const getTimeStringFromUnix = (unix) => {
		const date = new Date(unix).toLocaleDateString('en-US');
		const time = new Date(unix).toLocaleTimeString('en-US');
		return `${date} - ${time}`;
	};

	const sortByUpdatedAt = (asc) => {
		console.log('sort');
		preparedArticles = preparedArticles.sort((a, b) => {
			if (a.updatedAt < b.updatedAt) {
				return 1;
			}
			if (a.updatedAt > b.updatedAt) {
				return -1;
			}
			return 0;
		});
	};

	const filterArticles = () => {
		preparedArticles = data.articles.filter((article) => {
			if (article.title.toLowerCase().includes(filter.toLowerCase())) return true;
		});
	};

	const handleClickArticle = (title) => {
		goto(`/${data.user}/${title}`);
	};

	console.log(data);
</script>

<div class="dashboard" in:fade={{ duration: 100 }}>
	<div class="user">
		{data.user}'s Articles ({data.articles.length})
		<input type="text" name="filter" bind:value={filter} on:input={filterArticles} />
	</div>
	<form use:enhance method="POST">
		<div class="create">
			<input type="hidden" name="articlesLength" value={data.articles.length} />
			<button formaction="?/createArticle" class="createButton"> New Article </button>
		</div>
	</form>
	{#if ready}
		<div class="articles">
			{#each preparedArticles as article (article._id)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					in:fade={{ duration: 100 }}
					class="article"
					on:click={() => {
						handleClickArticle(article.title);
					}}
				>
					<div class="articleTitle">
						<div>
							{article.title}
						</div>
						<div class="articleOptions">
							<button class="editbutton" formaction="?/editArticle">
								<i class="fa-solid fa-pen-to-square" />
							</button>
							<button class="deleteButton" formaction="?/deleteArticle">
								<i class="fa-solid fa-trash" />
							</button>
						</div>
					</div>
					<div class="updated">Last Updated: {getTimeStringFromUnix(article.updatedAt)}</div>
					<form use:enhance method="POST">
						<input type="hidden" name="_id" value={article._id} />
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
		display: flex;

		gap: 20px;
	}

	.user input {
		padding: 5px;
	}
	.articles {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
	}
	.article {
		border-bottom: 3px solid lightcoral;
		margin-bottom: 4px;
		font-size: 16px;
		padding-bottom: 8px;
		width: fit-content;
		min-width: 300px;
		max-width: 500px;
		margin-top: 13px;
	}
	.article:hover {
		cursor: pointer;
	}
	.articleTitle {
		font-weight: bold;
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.articleOptions {
		text-align: right;
	}
	.article div {
		margin-bottom: 4px;
	}
	.create {
		margin-bottom: 13px;
	}
	.deleteButton:hover {
		background: red;
	}
	.updated {
		font-size: 13px;
	}
</style>
