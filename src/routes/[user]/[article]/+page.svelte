<script>
	import './styles.scss';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import Color from '@tiptap/extension-color';
	import FontFamily from '@tiptap/extension-font-family';
	import TextStyle from '../../../tiptap/text-style';
	import FontSize from '../../../tiptap/font-size';
	import TextDecoration from '../../../tiptap/text-decoration';
	import {
		BackgroundColor,
		BorderTopWidth,
		BorderTopStyle,
		BorderTopColor,
		BorderRightWidth,
		BorderRightStyle,
		BorderRightColor,
		BorderBottomWidth,
		BorderBottomStyle,
		BorderBottomColor,
		BorderLeftWidth,
		BorderLeftStyle,
		BorderLeftColor
	} from '../../../tiptap/Content';
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
	let saveButton = null;
	let saveTitleButton = null;
	let options = null;
	let titleOptions = null;
	let fontSizeValue = '16px';
	let fontFamilyValue = '';
	let fontColorValue = '';
	let highlightValue = '';
	let canBeMarkedAsTemplateVariable = false;
	let templateVariableName = '';
	let editorToolbarHeight = 0;

	//line height and height and display: inline-block;
	onMount(() => {
		setInterval(() => {
			if (dirty) {
				saveButton.click();
				dirty = false;
			}
		}, 1500);

		if (typeof data.article !== 'object') {
			data.article = JSON.parse(data.article);
		}

		lowlight.registerLanguage('js', js);

		newEditor();

		titleEditor = new Editor({
			element: titleElement,
			extensions: [StarterKit, FontSize, TextStyle],
			content: data.article.title
		});
	});

	const handleTitleSave = () => {
		let hrefSplit = window.location.href.split('/');
		hrefSplit[hrefSplit.length - 1] = data.article.title;
		window.location.href = hrefSplit.join('/');
	};

	const newEditor = () => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({ codeBlock: false, strike: false }),
				Link.configure({
					linkOnPaste: true,
					autolink: true,
					protocols: ['ftp', 'mailto', 'http', 'https']
				}),
				CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'js' }),
				TextStyle,
				FontSize.configure({
					types: ['textStyle']
				}),
				Color.configure({
					types: ['textStyle']
				}),
				TextDecoration.configure({
					types: ['textStyle']
				}),
				FontFamily.configure({
					types: ['textStyle']
				}),
				BorderTopWidth.configure({
					types: ['textStyle']
				}),
				BorderTopStyle.configure({
					types: ['textStyle']
				}),
				BorderTopColor.configure({
					types: ['textStyle']
				}),
				BorderRightWidth.configure({
					types: ['textStyle']
				}),
				BorderRightStyle.configure({
					types: ['textStyle']
				}),
				BorderRightColor.configure({
					types: ['textStyle']
				}),
				BorderBottomWidth.configure({
					types: ['textStyle']
				}),
				BorderBottomStyle.configure({
					types: ['textStyle']
				}),
				BorderBottomColor.configure({
					types: ['textStyle']
				}),
				BorderLeftWidth.configure({
					types: ['textStyle']
				}),
				BorderLeftStyle.configure({
					types: ['textStyle']
				}),
				BorderLeftColor.configure({
					types: ['textStyle']
				}),
				BackgroundColor.configure({
					types: ['textStyle']
				})
			],

			content: data.article.content,
			onUpdate: () => {
				editor = editor;
				dirty = true;
			},
			onSelectionUpdate: () => {
				setCanBeMarkedAsTemplateVariable();
			}
		});
	};

	const getSelectedText = () => {
		const state = editor.view.state;
		const selection = state.selection;
		const { from, to } = selection;
		const text = state.doc.textBetween(from, to, ' ');
		const sel = editor.view.state.selection;
		editor.view.state.doc.nodesBetween(sel.from, sel.to, (node, start, parent, index) => {
			console.log({ node, start });
		});
		return text;
	};

	const setCanBeMarkedAsTemplateVariable = () => {
		const text = getSelectedText().trim();
		if (
			text.length >= 5 &&
			text[0] === '{' &&
			text[1] === '{' &&
			text[text.length - 1] === '}' &&
			text[text.length - 2] === '}'
		) {
			canBeMarkedAsTemplateVariable = true;
			templateVariableName = text
				.split('')
				.filter((c) => c !== '{' && c !== '}')
				.join('');
			processTemplate();
		} else {
			canBeMarkedAsTemplateVariable = false;
		}
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

	const processTemplate = () => {
		const sel = editor.view.state.selection;
		editor.view.state.doc.nodesBetween(sel.from, sel.to, (node, start, parent, index) => {
			console.log({ node, start });
		});
	};

	const setOptions = async () => {
		// getSelectedText();
		// processTemplate();
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
								fontSizeValue = parseInt(node.marks[index].attrs.fontSize);
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
			if (!existingFontSizeFound) {
				if (largestSurrounding) {
					fontSizeValue = largestSurrounding + 'px';
				} else {
					fontSizeValue = '16px';
				}
			}
		}
	};
</script>

{#if editor}
	<div class="toolbar">
		<form
			method="POST"
			action="?/saveTitle"
			class="titleForm"
			use:enhance={() => {
				return async () => {
					handleTitleSave();
				};
			}}
		>
			<label class="titleLabel" for="articleTitle">Title</label>
			<input bind:value={data.article.title} placeholder="title" name="articleTitle" />

			<input style="display: none;" value={JSON.stringify({ ...data.article })} name="article" />
			<button bind:this={saveTitleButton} type="submit">Save</button>
		</form>
		<div class="editorToolbar" bind:offsetHeight={editorToolbarHeight}>
			<div>
				<button
					on:click={() => editor.chain().focus().setBold().run()}
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
					on:click={() => editor.chain().focus().setTextDecoration('line-through').run()}
					disabled={false}
					class={editor.isActive('textStyle', { textDecoration: 'line-through' })
						? 'is-active'
						: ''}
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
						if (options === 'textStyle') {
							options = null;
						} else {
							options = 'textStyle';
							setOptions();
						}
					}}
					disabled={!editor.can().chain().focus().setColor().run()}
					class={editor.isActive('textStyle') ? 'is-active' : ''}
					><i class="fa-solid fa-font" /></button
				>

				<button
					on:click={() => editor.chain().focus().toggleCodeBlock().run()}
					class={editor.isActive('codeBlock') ? 'is-active' : ''}
				>
					<i class="fa-regular fa-file-code" />
				</button>
				<button disabled={!canBeMarkedAsTemplateVariable}><i class="fa-solid fa-cube" /></button>
				<button
					on:click={() => {
						console.log(editor.view.state.selection);
						editor.chain().focus().selectParentNode();
						console.log(editor.view.state.selection);
					}}
				>
					<i class="fa-solid fa-person" />
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
			{#if options}
				<div class="options" style={`top: ${editorToolbarHeight}px`}>
					{#if options === 'textStyle'}
						<div class="option">
							<label for="fontSize">Font Size</label>
							<div>
								<button
									on:click={() => {
										editor.chain().focus().setMark('textStyle', { fontSize: '100px' }).run();
										fontSizeValue = '16px';
									}}><i class="fa-solid fa-cancel" /></button
								>
								<button
									on:click={() => {
										fontSizeValue = parseInt(fontSizeValue) - 1 + 'px';
										editor.chain().focus().setMark('textStyle', { fontSize: fontSizeValue }).run();
									}}>-</button
								>
								<input bind:value={fontSizeValue} type="text" name="fontSize" />
								<button
									on:click={() => {
										fontSizeValue = parseInt(fontSizeValue) + 1 + 'px';
										editor.chain().focus().setMark('textStyle', { fontSize: fontSizeValue }).run();
									}}>+</button
								>
								<button
									on:click={() => {
										editor.chain().focus().setMark('textStyle', { fontFamily: 'serif' }).run();
									}}>font family</button
								>
							</div>
						</div>
						<div class="option">
							<label for="fontColor">Font Color</label>
							<div>
								<button
									on:click={() => {
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
						<div class="option">
							<label for="background">Background</label>
							<button
								on:click={() =>
									editor.chain().focus().setMark('textStyle', { backgroundColor: '#333' }).run()}
								>#333</button
							>
							<button
								on:click={() =>
									editor
										.chain()
										.focus()
										.setMark('textStyle', { backgroundColor: 'lightcoral' })
										.run()}>lightcoral</button
							>
							<button
								on:click={() =>
									editor
										.chain()
										.focus()
										.setMark('textStyle', { backgroundColor: 'lightblue' })
										.run()}>lightblue</button
							>
							<!-- <div>
								<button
									on:click={() => {
										editor.chain().focus().setMark('textStyle', { background: 'lightgreen' }).run();
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
							</div> -->
						</div>
						<div class="option">
							<label for="background">Border</label>
							<button
								on:click={() => {
									editor.chain().focus().setMark('textStyle', { borderTopWidth: '3px' }).run();
									editor.chain().focus().setMark('textStyle', { borderTopStyle: 'solid' }).run();
									editor.chain().focus().setMark('textStyle', { borderTopColor: 'red' }).run();
									editor.chain().focus().setMark('textStyle', { borderRightWidth: '3px' }).run();
									editor.chain().focus().setMark('textStyle', { borderRightStyle: 'solid' }).run();
									editor.chain().focus().setMark('textStyle', { borderRightColor: 'red' }).run();
									editor.chain().focus().setMark('textStyle', { borderBottomWidth: '3px' }).run();
									editor.chain().focus().setMark('textStyle', { borderBottomStyle: 'solid' }).run();
									editor.chain().focus().setMark('textStyle', { borderBottomColor: 'red' }).run();
									editor.chain().focus().setMark('textStyle', { borderLeftWidth: '3px' }).run();
									editor.chain().focus().setMark('textStyle', { borderLeftStyle: 'solid' }).run();
									editor.chain().focus().setMark('textStyle', { borderLeftColor: 'red' }).run();
								}}>1px solid black</button
							>
							<button
								on:click={() => {
									editor.chain().focus().unsetBorderTopWidth().run();
									editor.chain().focus().unsetBorderTopStyle().run();
									editor.chain().focus().unsetBorderTopColor().run();
									editor.chain().focus().unsetBorderRightWidth().run();
									editor.chain().focus().unsetBorderRightStyle().run();
									editor.chain().focus().unsetBorderRightColor().run();
									editor.chain().focus().unsetBorderBottomWidth().run();
									editor.chain().focus().unsetBorderBottomStyle().run();
									editor.chain().focus().unsetBorderBottomColor().run();
									editor.chain().focus().unsetBorderLeftWidth().run();
									editor.chain().focus().unsetBorderLeftStyle().run();
									editor.chain().focus().unsetBorderLeftColor().run();
								}}>none</button
							>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
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
	on:mouseup={async () => {}}
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
		gap: 13px;
		flex-wrap: wrap;
		margin: 20px;
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
		position: relative;
	}
	.editorToolbar button {
		margin-top: 8px;
		font-weight: bold;
		display: inline-flex;
		align-items: center;
	}

	.options {
		width: fit-content;
		padding: 8px;
		border: 3px solid black;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		gap: 13px;
		min-width: 250px;
		position: absolute;
		background: white;
		left: -3px;
		opacity: 0.9;
		z-index: 5;
	}
	.option {
		display: flex;
		gap: 8px;
		justify-content: space-between;
		align-items: center;
	}
	.options .option button {
		margin: 0px;
	}
	.option label {
		min-width: 100px;
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
