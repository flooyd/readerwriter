import '@tiptap/extension-text-style';

import { Extension } from '@tiptap/core';

export type TextDecorationOptions = {
	types: string[];
};

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		textDecoration: {
			/**
			 * Set the font size
			 */
			setTextDecoration: (textDecoration: string) => ReturnType;
			/**
			 * Unset the font size
			 */
			unsetTextDecoration: () => ReturnType;
		};
	}
}

export const TextDecoration = Extension.create<TextDecorationOptions>({
	name: 'textDecoration',

	addOptions() {
		return {
			types: ['textStyle']
		};
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					textDecoration: {
						default: null,
						parseHTML: (element) => element.style.textDecoration?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.textDecoration) {
								return {};
							}

							return {
								style: `text-decoration: ${attributes.textDecoration}`
							};
						}
					}
				}
			}
		];
	},

	addCommands() {
		return {
			setTextDecoration:
				(textDecoration) =>
				({ chain }) => {
					return chain().setMark('textStyle', { textDecoration }).run();
				},
			unsetTextDecoration:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { textDecoration: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});
