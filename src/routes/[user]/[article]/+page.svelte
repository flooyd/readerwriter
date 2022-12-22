<script>
	import './styles.scss';
	import StarterKit from '@tiptap/starter-kit';
	import Document from '@tiptap/extension-document';
	import Placeholder from '@tiptap/extension-placeholder';
	import Link from '@tiptap/extension-link';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import { lowlight } from 'lowlight';
	import js from 'highlight.js/lib/languages/javascript';

	export let data;

	let element;
	let editor;
	let dirty = false;
	let titleDirty = false;
	let ready = false;
	let saveButton = null;
	let saveTitleButton = null;

	onMount(() => {
		setInterval(() => {
			if (dirty) {
				saveButton.click();
				dirty = false;
			}
			if (titleDirty) {
				saveTitleButton.click();
				titleDirty = false;
			}
		}, 1500);

		data.article = JSON.parse(data.article);

		lowlight.registerLanguage('js', js);

		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({ codeBlock: false }),
				Link.configure({
					linkOnPaste: true,
					autolink: true,
					protocols: ['ftp', 'mailto', 'http', 'https']
				}),
				CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'js' })
			],

			content: data.article.content,
			onUpdate: () => {
				editor = editor;
				dirty = true;
			}
		});
	});

	$: console.log(data.article.content);
</script>

{#if editor}
	<div class="editorToolbar">
		<div>
			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'is-active' : ''}
			>
				<i class="fa-solid fa-bold" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class={editor.isActive('italic') ? 'is-active' : ''}
			>
				<i class="fa-solid fa-italic" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class={editor.isActive('strike') ? 'is-active' : ''}
			>
				<i class="fa-solid fa-strikethrough" />
			</button>
			<button on:click={() => {}}><i class="fa-solid fa-link" /></button>
			<button
				on:click={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				class={editor.isActive('code') ? 'is-active' : ''}
			>
				<i class="fa-solid fa-code" />
			</button>

			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
			>
				<i class="fa-solid fa-heading" /><span class="headingNumber">2</span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
			>
				<i class="fa-solid fa-heading" /><span class="headingNumber">3</span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
			>
				<i class="fa-solid fa-heading" /> <span class="headingNumber">4</span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				class={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
			>
				<i class="fa-solid fa-heading" /><span class="headingNumber">5</span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				class={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
			>
				<i class="fa-solid fa-heading" /><span class="headingNumber">6</span>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				<i class="fa-solid fa-list" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class={editor.isActive('orderedList') ? 'is-active' : ''}
			>
				<i class="fa-solid fa-list-ol" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCodeBlock().run()}
				class={editor.isActive('codeBlock') ? 'is-active' : ''}
			>
				<i class="fa-regular fa-file-code" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				class={editor.isActive('blockquote') ? 'is-active' : ''}
			>
				<i class="fa-solid fa-quote-left" />
			</button>
			<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
				<i class="fa-solid fa-ruler-horizontal" />
			</button>
			<button
				on:click={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<i class="fa-solid fa-rotate-left" />
			</button>
			<button
				on:click={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<i class="fa-solid fa-arrow-rotate-right" />
			</button>
		</div>
	</div>
{/if}

<form
	method="POST"
	action="?/saveTitle"
	class="titleForm"
	use:enhance={async ({ form, data, action, cancel }) => {
		console.log(data.get('article'));
		return async () => {
			editor.commands.focus();
		};
	}}
>
	<div>
		<label class="titleLabel" for="articleTitle">Title</label>
		<input bind:value={data.article.title} placeholder="title" name="articleTitle" />
	</div>
	<input style="display: none;" value={JSON.stringify({ ...data.article })} name="article" />
	<button style="display: none;" bind:this={saveTitleButton} type="submit">Save</button>
</form>

<h1 class="title">{data.article.title}</h1>
<div
	on:mouseup={() => {
		console.log(editor.view.state.selection.$anchor.pos);
	}}
	bind:this={element}
/>

{#if editor}
	<form
		style="display: none;"
		method="POST"
		use:enhance={() => {
			return async () => {
				editor.commands.focus();
			};
		}}
	>
		<input value={JSON.stringify({ ...data.article, content: editor.getHTML() })} name="article" />
		<button bind:this={saveButton} type="submit" formaction="?/save">Save</button>
	</form>
{/if}

<style>
	.editorToolbar {
		margin-top: 20px;
		margin-left: 20px;
		border: 3px solid black;
		border-radius: 5px;
		padding: 0px 8px;
		padding-bottom: 8px;
		width: fit-content;
		display: flex;
		justify-content: center;
		margin: 20px auto;
	}
	.editorToolbar button {
		margin-top: 8px;
		font-weight: bold;
		display: inline-flex;
		align-items: center;
	}
	button span {
		margin-left: 4px;
	}
	.is-active {
		background: lightcoral;
	}
	input {
		margin: 0px auto;
		height: 29px;
		border: 2px solid black;
		border-radius: 5px;
	}
	.titleForm {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.titleLabel {
		margin-right: 8px;
	}
	.title {
		margin: 0px;
		margin-left: 20px;
	}
</style>
