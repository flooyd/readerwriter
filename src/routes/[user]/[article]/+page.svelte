<script>
	import './styles.scss';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import FontSize from '@tobiasafischer/tiptap-extension-font-size';
	import Color from '@tiptap/extension-color';
	import TextStyle from '@tiptap/extension-text-style';
	import { Editor } from '@tiptap/core';
	import { onMount, tick } from 'svelte';
	import { enhance } from '$app/forms';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import { lowlight } from 'lowlight';
	import js from 'highlight.js/lib/languages/javascript';

	export let data;

	let element;
	let titleElement;
	let editor;
	let titleEditor;
	let dirty = false;
	let titleDirty = false;
	let saveButton = null;
	let saveTitleButton = null;
	let options = null;
	let titleOptions = null;
	let fontSizeValue = '16px';
	let fontFamilyValue = '';
	let fontColorValue = '';
	let highlightValue = '';

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

		newEditor();

		titleEditor = new Editor({
			element: titleElement,
			extensions: [StarterKit, FontSize, TextStyle],
			content: data.article.title
		});
	});

	const newEditor = () => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({ codeBlock: false }),
				Link.configure({
					linkOnPaste: true,
					autolink: true,
					protocols: ['ftp', 'mailto', 'http', 'https']
				}),
				CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'js' }),
				FontSize,
				TextStyle,
				Color.configure({
					types: ['textStyle']
				})
			],

			content: data.article.content,
			onUpdate: () => {
				editor = editor;
				dirty = true;
			},
			onSelectionUpdate: () => {
				editor = editor;
			}
		});
	};

	const getSelectedText = () => {
		const state = editor.view.state;
		const selection = state.selection;
		const { from, to } = selection;
		const text = state.doc.textBetween(from, to, ' ');
		return text;
	};

	const setLink = () => {
		let url;
		const text = getSelectedText();
		if (
			text.includes('http://') ||
			text.includes('https://') ||
			text.includes('ftp://') ||
			text.includes('mailto:') ||
			text.includes('www.')
		) {
			url = window.prompt('URL', text);
		} else {
			url = window.prompt('URL');
		}

		editor.chain().focus().setLink({ href: url }).run();
	};

	const setOptions = async () => {
		if (options === 'textStyle') {
			const selection = editor.view.state.selection;
			const anchorPos = selection.$anchor.pos;
			const headPos = selection.$head.pos;
			const selectionStart = anchorPos > headPos ? headPos : anchorPos;
			const selectionEnd = anchorPos > headPos ? anchorPos : headPos;
			let largestSurrounding = null;
			let surroundingColor = null;
			let surroundingFamily = null;
			let existingFontSizeFound = false;
			let surroundingColorFound = false;
			let surroundingFamilyFound = false;
			editor.view.state.doc.nodesBetween(
				selectionStart,
				selectionEnd,
				(node, start, parent, index) => {
					if (parent.type.name !== 'doc') {
						node.marks.forEach((mark, index) => {
							if (mark.attrs.fontSize && node.text.length === selectionEnd - selectionStart) {
								fontSizeValue = node.marks[index].attrs.fontSize;
								existingFontSizeFound = true;
							}
							if (mark.attrs.fontSize) {
								if (parseInt(mark.attrs.fontSize) > largestSurrounding) {
									largestSurrounding = parseInt(mark.attrs.fontSize);
								}
							}
						});
					}
				}
			);
			if (!existingFontSizeFound) fontSizeValue = largestSurrounding || '16px';
		}
	};

	$: editor ? console.log(editor.view.state.selection) : null;
	$: options ? setOptions() : null;
</script>

<div bind:this={titleElement} style="display: none;" />
<div>{editor ? getSelectedText() : null}</div>
{#if editor}
	<div class="toolbar">
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
			<label class="titleLabel" for="articleTitle">Title</label>
			<input bind:value={data.article.title} placeholder="title" name="articleTitle" />

			<input style="display: none;" value={JSON.stringify({ ...data.article })} name="article" />
			<button style="display: none;" bind:this={saveTitleButton} type="submit">Save</button>
		</form>
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
				<button
					on:click={() => {
						setLink();
					}}><i class="fa-solid fa-link" /></button
				>
				<button
					on:click={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					class={editor.isActive('code') ? 'is-active' : ''}
				>
					<i class="fa-solid fa-code" />
				</button>
				<button
					on:click={() => {
						options === 'textStyle' ? (options = null) : (options = 'textStyle');
					}}
					disabled={!editor.can().chain().focus().setColor().run()}
					class={editor.isActive('textStyle') ? 'is-active' : ''}
					><i class="fa-solid fa-font" /></button
				>
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
	</div>
	{#if options}
		<div class="options">
			{#if options === 'textStyle'}
				<div class="option">
					<label for="fontSize">Font Size</label>
					<div>
						<button
							on:click={() => {
								console.log('hi');
								editor.chain().focus().setFontSize('16px').run();
								fontSizeValue = '16px';
							}}><i class="fa-solid fa-cancel" /></button
						>
						<button
							on:click={() => {
								fontSizeValue = parseInt(fontSizeValue) - 1 + 'px';
								editor.chain().focus().setFontSize(fontSizeValue).run();
							}}>-</button
						>
						<input bind:value={fontSizeValue} type="text" name="fontSize" />
						<button
							on:click={() => {
								fontSizeValue = parseInt(fontSizeValue) + 1 + 'px';
								editor.chain().focus().setFontSize(fontSizeValue).run();
							}}>+</button
						>
					</div>
				</div>
				<div class="option">
					<label for="fontColor">Font Color</label>
					<div>
						<button
							on:click={() => {
								console.log('hi');
								editor.chain().focus().setColor('#000000').run();
								fontColorValue = '#000000';
							}}><i class="fa-solid fa-cancel" /></button
						>
						<input
							on:input={(e) => {
								fontColorValue = e.target.value;
								editor.chain().focus().setColor(fontColorValue).run();
							}}
							bind:value={fontColorValue}
							type="color"
						/>
					</div>
				</div>
			{/if}
		</div>
	{/if}
{/if}

<div
	bind:this={element}
	on:click={() => {
		options = null;
		fontSizeValue = '16px';
	}}
	on:keydown={() => {
		options = null;
		fontSizeValue = '16px';
	}}
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
	.toolbar {
		display: flex;
		flex-direction: column;
		margin-left: 20px;
		gap: 13px;
		margin-top: 20px;
		flex-wrap: wrap;
		margin-bottom: 20px;
	}
	.toolbar .titleForm {
		display: flex;
		gap: 8px;
		align-items: center;
		width: fit-content;
	}
	.toolbar .titleForm input {
		width: 300px;
	}
	.editorToolbar {
		border: 3px solid black;
		border-radius: 5px;
		padding: 0px 8px;
		padding-bottom: 8px;
		width: fit-content;
		display: flex;
		justify-content: center;
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
	.options {
		margin-left: 20px;
		width: fit-content;
		padding: 8px;
		border: 3px solid black;
		margin-top: -15px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		gap: 13px;
		opacity: 0.5;
		width: 300px;
	}
	.option {
		display: flex;
		gap: 8px;
		justify-content: space-between;
		align-items: center;
	}
	.option div {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.option input {
		margin: 0px;
	}
	.is-active {
		background: lightcoral;
	}
	input {
		margin: 0px auto;
		height: 29px;
		border: 2px solid black;
		border-radius: 5px;
		width: 100px;
	}
</style>
