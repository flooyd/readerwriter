<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let data;

	let ready = false;
	let content = '';
	let preparedArticle;

	onMount(() => {
		ready = true;
	});

	$: if (data) {
		if (typeof data.article === 'object') {
		} else {
			data.article = JSON.parse(data.article);
			preparedArticle = data.article;
		}
	}

	const getTimeStringFromUnix = (unix) => {
		const date = new Date(unix).toLocaleDateString('en-US');
		const time = new Date(unix).toLocaleTimeString('en-US');
		return `${date} - ${time}`;
	};

	const handleTextAreaInput = () => {
		preparedArticle = preparedArticle;
	};
</script>

<div in:fade={{ duration: 300 }} class="article">
	<div class="title">
		{preparedArticle.title}
	</div>
	<div class="subtitle">
		An article by blah <span
			>- Last updated on {getTimeStringFromUnix(preparedArticle.updatedAt)}</span
		>
	</div>
	<!-- <textarea bind:value={preparedArticle.content} on:input={() => handleTextAreaInput()} /> -->
	<div class="content">{@html preparedArticle.content}</div>
</div>

<style>
	.article {
		padding: 20px;
		margin: 20px 0px;
	}

	.title {
		font-family: 'Lobster', cursive;
		font-size: 31px;
		color: lightcoral;
		font-weight: bold;
	}

	.subtitle {
		font-size: 16px;
		margin-top: 13px;
		font-style: italic;
		padding-bottom: 13px;
		width: 100%;
		border-bottom: 2px solid black;
	}

	.subtitle span {
		font-style: normal;
	}

	.content {
		margin-top: 20px;
		min-height: 300px;
		width: 100%;
		padding: 20px;
		line-height: 1.25;
		color: black;
	}

	textarea {
		margin-top: 20px;
		width: 100%;
		min-height: 300px;
		padding: 0px;
	}
</style>
