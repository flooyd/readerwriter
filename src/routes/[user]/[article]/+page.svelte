<script>
	import { enhance } from '$app/forms';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { editMode } from '../../../stores';
	export let data;

	let preparedArticle,
		selection,
		saveButton,
		saveSelectionButton,
		textArea = null;
	let dirty = false;
	let selectionStart = 0;
	let selectionEnd = 0;
	let selections = [];
	let processedSelections = [];
	let existingSelection = null;
	let editedContent = '';

	String.prototype.splice = function (start, delCount, newSubStr) {
		console.log('blah');
		return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
	};

	onMount(() => {
		setInterval(() => {
			if (dirty) {
				save();
				dirty = false;
			}
		}, 2000);

		if (typeof data.article === 'string') {
			data.article = JSON.parse(data.article);
		}
		if (typeof data.selections === 'string') {
			selections = JSON.parse($page.data.selections);
		}

		preparedArticle = data.article;
		editedContent = preparedArticle.content;
		$editMode = true;
		processSelections();
		console.log(selections);
	});

	const getTimeStringFromUnix = (unix) => {
		const date = new Date(unix).toLocaleDateString('en-US');
		const time = new Date(unix).toLocaleTimeString('en-US');
		return `${date} - ${time}`;
	};

	const handleTextAreaInput = (e) => {
		console.log(e);
		editedContent = e.target.innerText;
		dirty = true;
	};

	const save = () => {
		saveButton.click();
	};

	const handleTextAreaSelection = async (e) => {
		e.stopPropagation();
		const { anchorOffset, focusOffset } = window.getSelection();
		selectionStart = anchorOffset;
		selectionEnd = focusOffset;
		while (
			preparedArticle.content[selectionStart] === ' ' ||
			preparedArticle.content[selectionStart] === '\\n'
		) {
			selectionStart++;
		}

		while (
			preparedArticle.content[selectionEnd] === ' ' ||
			preparedArticle.content[selectionEnd] === '\\n'
		) {
			selectionEnd--;
		}

		existingSelection = selections.find(
			(s) => s.selectionStart === selectionStart && s.selectionEnd === selectionEnd
		);

		if (existingSelection) {
			console.log('existing selection');
			return;
		}

		selection = { selectionStart, selectionEnd };
	};

	const updateStyle = async (property, value) => {
		if (!selection.style) selection.style = {};
		selection = {
			...selection,
			style: { ...selection.style, [property]: value }
		};
		await tick();
		selections = [...selections, selection];
		processSelections();
		await tick();
		saveSelectionButton.click();
	};

	const processSelections = () => {
		processedSelections = selections.map((s) => {
			return {
				...s,
				styleStr: () => {
					let str = '';
					Object.keys(s.style).forEach((k) => {
						str += k + ':' + s.style[k] + ';';
					});
					return str;
				},
				text: preparedArticle.content.substring(s.selectionStart, s.selectionEnd)
			};
		});
	};

	const clearSelection = async () => {
		selection = null;
		existingSelection = null;
		selectionStart = 0;
		selectionEnd = 0;
	};

	//new lines are wonky so handling them manually
	const handleEnter = (e) => {
		return;
		if (e.which == 13) {
			e.stopPropagation();
			e.preventDefault();
			console.log('hi');
			const cursorLocation = window.getSelection();
			if (cursorLocation.anchorOffset !== cursorLocation.focusOffset) {
				console.log('..');
				return;
			}
			editedContent = editedContent.splice(cursorLocation.focusOffset + 1, 0, '\\n');
			console.log(editedContent);
		}
	};
</script>

<svelte:head>
	<title>Read and Write - {preparedArticle?.title}</title>
	<meta name="description" content={`Read and Write - ${preparedArticle?.title}`} />
</svelte:head>

{#if preparedArticle}
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
				{#if $page.data.auth && $page.data.username === data.user}
					<button class="editButton" type="button" on:click={() => ($editMode = !$editMode)}
						>{$editMode ? 'Hide Editor' : 'Show Editor'}</button
					>
				{/if}

				<input
					type="hidden"
					name="article"
					value={JSON.stringify({ ...preparedArticle, content: editedContent })}
				/>
				<button formaction="?/save" bind:this={saveButton} type="submit">Save</button>
			</form>
		</div>
		<div class="subtitle">
			An article by {preparedArticle.author}
			<span>- Last updated on {getTimeStringFromUnix(preparedArticle.updatedAt)}</span>
		</div>
		{#if $page.data.auth && $page.data.username === data.user && $editMode}
			<div class="toolbar">
				<button
					disabled={!selection && !existingSelection}
					style="font-weight: bold;"
					class={existingSelection?.style['font-weight'] === 700 ? 'active' : ''}
					on:click={() => {
						updateStyle('font-weight', existingSelection?.style['font-weight'] === 700 ? 400 : 700);
					}}>b</button
				>
			</div>
			<form use:enhance method="POST">
				<input type="hidden" name="article" value={JSON.stringify(preparedArticle)} />
				<input type="hidden" name="selection" value={JSON.stringify(selection)} />
				<button
					formaction="?/saveSelection"
					bind:this={saveSelectionButton}
					type="submit"
					style="display: none;">Save Selection</button
				>
			</form>
		{/if}
		<div
			class="content"
			on:keydown={(e) => handleEnter(e)}
			bind:this={textArea}
			contenteditable="true"
			on:input={(e) => handleTextAreaInput(e)}
			on:mousedown={() => {
				clearSelection();
			}}
			on:mouseup={(e) => handleTextAreaSelection(e)}
		>
			{`${preparedArticle.content}`}
		</div>
		{#if processedSelections.length > 0}
			<div class="selections">
				{#each processedSelections as selection}
					<div style={selection.styleStr()}>{selection.text}</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.toolbar {
		border: 1px solid black;
		padding: 5px 13px;
		width: 100%;
		margin-top: 20px;
		background: white;
	}

	.active {
		background: rgba(14, 75, 60, 1);
		color: white;
	}
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
		width: 100%;
		line-height: 1.25;
		color: black;
		white-space: pre-wrap;
	}

	[contenteditable] {
		outline: 0px solid transparent;
	}

	.selections {
		border: 1px solid black;
		margin-top: 20px;
	}

	::selection {
		background-color: lightcoral;
		font-weight: bold;
	}

	.editButton {
		margin-right: 13px;
	}

	.editButton:hover {
		background: #0e4b3c;
	}
</style>
