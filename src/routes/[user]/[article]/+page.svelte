<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	export let data;

	let preparedArticle;
	let saveButton,
		textArea = null;
	let dirty = false;

	onMount(() => {
		setInterval(() => {
			if (dirty) {
				save();
				dirty = false;
			}
		}, 2000);
	});

	$: if (data) {
		if (typeof data.article === 'object') {
		} else {
			data.article = JSON.parse(data.article);
			preparedArticle = data.article;
		}
		console.log(data);
	}

	const getTimeStringFromUnix = (unix) => {
		const date = new Date(unix).toLocaleDateString('en-US');
		const time = new Date(unix).toLocaleTimeString('en-US');
		return `${date} - ${time}`;
	};

	const handleTextAreaInput = () => {
		dirty = true;
		preparedArticle = preparedArticle;
	};

	const save = () => {
		saveButton.click();
		textArea.focus();
	};
</script>

<div in:fade={{ duration: 300 }} class="article">
	<div class="title">
		<form
			use:enhance={() => {
				return async () => {
					textArea.focus();
				};
			}}
			method="POST"
		>
			<div>{preparedArticle.title}</div>
			<input type="hidden" name="article" value={JSON.stringify(preparedArticle)} />
			<button formaction="?/save" bind:this={saveButton} type="submit" style="display: none;"
				>Save</button
			>
		</form>
	</div>
	<div class="subtitle">
		An article by {preparedArticle.author}
		<span>- Last updated on {getTimeStringFromUnix(preparedArticle.updatedAt)}</span>
	</div>
	{#if $page.data.auth && $page.data.username === data.user}
		<textarea
			bind:this={textArea}
			bind:value={preparedArticle.content}
			on:input={() => handleTextAreaInput()}
		/>
	{/if}

	<div class="content">{preparedArticle.content}</div>
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

	.title form div {
		width: fit-content;
		margin-right: 13px;
	}

	.title form {
		display: flex;
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
		white-space: pre-wrap;
	}

	textarea {
		margin-top: 20px;
		width: 100%;
		min-height: 300px;
		padding: 0px;
		white-space: pre-wrap;
	}
</style>
