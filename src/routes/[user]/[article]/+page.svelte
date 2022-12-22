<script>
	import './styles.scss';
	import StarterKit from '@tiptap/starter-kit';
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
	let ready = false;
	let saveButton = null;

	onMount(() => {
		setInterval(() => {
			if (dirty) {
				saveButton.click();
				dirty = false;
			}
		}, 1500);

		data.article = JSON.parse(data.article);

		lowlight.registerLanguage('js', js);

		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({ codeBlock: false }),
				Link.configure({ linkOnPaste: true }),
				CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'js' })
			],
			content: data.article.content,
			onUpdate: () => {
				console.log(editor.getJSON());
				editor = editor;
				dirty = true;
			}
		});
		console.log('save button', saveButton);
	});

	$: saveButton ? (ready = true) : null;
</script>

{#if editor}
	<div class="editorToolbar">
		<div>
			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'is-active' : ''}
			>
				bold
			</button>
			<button
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class={editor.isActive('italic') ? 'is-active' : ''}
			>
				italic
			</button>
			<button
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class={editor.isActive('strike') ? 'is-active' : ''}
			>
				strike
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				class={editor.isActive('code') ? 'is-active' : ''}
			>
				code
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
			>
				h1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
			>
				h2
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
			>
				h3
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
			>
				h4
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				class={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
			>
				h5
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				class={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
			>
				h6
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				bullet list
			</button>
			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class={editor.isActive('orderedList') ? 'is-active' : ''}
			>
				ordered list
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCodeBlock().run()}
				class={editor.isActive('codeBlock') ? 'is-active' : ''}
			>
				code block
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				class={editor.isActive('blockquote') ? 'is-active' : ''}
			>
				blockquote
			</button>
			<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
				horizontal rule
			</button>
			<button on:click={() => editor.chain().focus().setHardBreak().run()}> hard break </button>
			<button
				on:click={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				undo
			</button>
			<button
				on:click={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				redo
			</button>
		</div>
	</div>
{/if}

<div bind:this={element} />

<form
	style="display: none;"
	method="POST"
	use:enhance={() => {
		return async () => {
			editor.commands.focus();
		};
	}}
>
	<input value={JSON.stringify({ ...data.article, content: editor?.getHTML() })} name="article" />
	<button bind:this={saveButton} type="submit" formaction="?/save">Save</button>
</form>

<style>
	.editorToolbar {
		margin-top: 20px;
		margin-left: 20px;
		border: 3px solid black;
		border-radius: 5px;
		padding: 0px 8px;
		padding-bottom: 8px;
		width: calc(100% - 40px);
	}
	.editorToolbar button {
		margin-top: 8px;
	}
	.is-active {
		background: lightcoral;
	}
</style>
