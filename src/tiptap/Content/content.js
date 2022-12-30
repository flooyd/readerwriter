import '@tiptap/extension-text-style';

import { Extension } from '@tiptap/core';
//#region BORDER
//#region BORDER-TOP
export const BorderTopWidth = Extension.create({
	name: 'borderTopWidth',

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
					borderTopWidth: {
						default: null,
						parseHTML: (element) => element.style.borderTopWidth?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderTopWidth) {
								return {};
							}

							return {
								style: `border-top-width: ${attributes.borderTopWidth}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderTopWidth:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderTopWidth: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderTopColor = Extension.create({
	name: 'borderTopColor',

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
					borderTopColor: {
						default: null,
						parseHTML: (element) => element.style.borderTopColor?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderTopColor) {
								return {};
							}

							return {
								style: `border-top-color: ${attributes.borderTopColor}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderTopColor:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderTopColor: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderTopStyle = Extension.create({
	name: 'borderTopStyle',

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
					borderTopStyle: {
						default: null,
						parseHTML: (element) => element.style.borderTopStyle?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderTopStyle) {
								return {};
							}

							return {
								style: `border-top-style: ${attributes.borderTopStyle}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderTopStyle:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderTopStyle: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});
//#endregion
//#region BORDER-RIGHT
export const BorderRightWidth = Extension.create({
	name: 'borderRightWidth',

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
					borderRightWidth: {
						default: null,
						parseHTML: (element) => element.style.borderRightWidth?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderRightWidth) {
								return {};
							}

							return {
								style: `border-right-width: ${attributes.borderRightWidth}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderRightWidth:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderRightWidth: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderRightColor = Extension.create({
	name: 'borderRightColor',

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
					borderRightColor: {
						default: null,
						parseHTML: (element) => element.style.borderRightColor?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderRightColor) {
								return {};
							}

							return {
								style: `border-right-color: ${attributes.borderRightColor}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderRightColor:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderRightColor: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderRightStyle = Extension.create({
	name: 'borderRightStyle',

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
					borderRightStyle: {
						default: null,
						parseHTML: (element) => element.style.borderRightStyle?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderRightStyle) {
								return {};
							}

							return {
								style: `border-right-style: ${attributes.borderRightStyle}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderRightStyle:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderRightStyle: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});
//#endregion
//#region BORDER-BOTTOM
export const BorderBottomWidth = Extension.create({
	name: 'borderBottomWidth',

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
					borderBottomWidth: {
						default: null,
						parseHTML: (element) => element.style.borderBottomWidth?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderBottomWidth) {
								return {};
							}

							return {
								style: `border-bottom-width: ${attributes.borderBottomWidth}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderBottomWidth:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderBottomWidth: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderBottomColor = Extension.create({
	name: 'borderBottomColor',

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
					borderBottomColor: {
						default: null,
						parseHTML: (element) => element.style.borderBottomColor?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderBottomColor) {
								return {};
							}

							return {
								style: `border-bottom-color: ${attributes.borderBottomColor}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderBottomColor:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderBottomColor: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderBottomStyle = Extension.create({
	name: 'borderBottomStyle',

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
					borderBottomStyle: {
						default: null,
						parseHTML: (element) => element.style.borderBottomStyle?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderBottomStyle) {
								return {};
							}

							return {
								style: `border-bottom-style: ${attributes.borderBottomStyle}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderBottomStyle:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderBottomStyle: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});
//#endregion
//#region BORDER-LEFT
export const BorderLeftWidth = Extension.create({
	name: 'borderLeftWidth',

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
					borderLeftWidth: {
						default: null,
						parseHTML: (element) => element.style.borderLeftWidth?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderLeftWidth) {
								return {};
							}

							return {
								style: `border-left-width: ${attributes.borderLeftWidth}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderLeftWidth:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderLeftWidth: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderLeftColor = Extension.create({
	name: 'borderLeftColor',

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
					borderLeftColor: {
						default: null,
						parseHTML: (element) => element.style.borderLeftColor?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderLeftColor) {
								return {};
							}

							return {
								style: `border-left-color: ${attributes.borderLeftColor}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderLeftColor:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderLeftColor: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BorderLeftStyle = Extension.create({
	name: 'borderLeftStyle',

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
					borderLeftStyle: {
						default: null,
						parseHTML: (element) => element.style.borderLeftStyle?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.borderLeftStyle) {
								return {};
							}

							return {
								style: `border-left-style: ${attributes.borderLeftStyle}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBorderLeftStyle:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { borderLeftStyle: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});
//#endregion
//#endregion
//#region PADDING
//#region PADDING-TOP
export const PaddingTop = Extension.create({
	name: 'paddingTop',

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
					paddingTop: {
						default: null,
						parseHTML: (element) => element.style.paddingTop?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.paddingTop) {
								return {};
							}

							return {
								style: `padding-top: ${attributes.paddingTop}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetPaddingTop:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { paddingTop: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#region PADDING-RIGHT
export const PaddingRight = Extension.create({
	name: 'paddingRight',

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
					paddingRight: {
						default: null,
						parseHTML: (element) => element.style.paddingRight?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.paddingRight) {
								return {};
							}

							return {
								style: `padding-right: ${attributes.paddingRight}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetPaddingRight:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { paddingRight: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#region PADDING-BOTTOM
export const PaddingBottom = Extension.create({
	name: 'paddingBottom',

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
					paddingBottom: {
						default: null,
						parseHTML: (element) => element.style.paddingBottom?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.paddingBottom) {
								return {};
							}

							return {
								style: `padding-bottom: ${attributes.paddingBottom}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetPaddingBottom:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { paddingBottom: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#region PADDING-LEFT
export const PaddingLeft = Extension.create({
	name: 'paddingLeft',

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
					paddingLeft: {
						default: null,
						parseHTML: (element) => element.style.paddingLeft?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.paddingLeft) {
								return {};
							}

							return {
								style: `padding-left: ${attributes.paddingLeft}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetPaddingLeft:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { paddingLeft: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#endregion
//#region MARGIN
//#region MARGIN-TOP
export const MarginTop = Extension.create({
	name: 'marginTop',

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
					marginTop: {
						default: null,
						parseHTML: (element) => element.style.marginTop?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.marginTop) {
								return {};
							}

							return {
								style: `margin-top: ${attributes.marginTop}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetMarginTop:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { marginTop: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#region MARGIN-RIGHT
export const MarginRight = Extension.create({
	name: 'marginRight',

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
					marginRight: {
						default: null,
						parseHTML: (element) => element.style.marginRight?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.marginRight) {
								return {};
							}

							return {
								style: `margin-right: ${attributes.marginRight}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetMarginRight:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { marginRight: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#region MARGIN-BOTTOM
export const MarginBottom = Extension.create({
	name: 'marginBottom',

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
					marginBottom: {
						default: null,
						parseHTML: (element) => element.style.marginBottom?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.marginBottom) {
								return {};
							}

							return {
								style: `margin-bottom: ${attributes.marginBottom}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetMarginBottom:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { marginBottom: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#region MARGIN-LEFT
export const MarginLeft = Extension.create({
	name: 'marginLeft',

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
					marginLeft: {
						default: null,
						parseHTML: (element) => element.style.marginLeft?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.marginLeft) {
								return {};
							}

							return {
								style: `margin-left: ${attributes.marginLeft}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetMarginLeft:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { marginLeft: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//#endregion
//#region DIMENSIONS
export const Height = Extension.create({
	name: 'height',

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
					height: {
						default: null,
						parseHTML: (element) => element.style.height?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.height) {
								return {};
							}

							return {
								style: `height: ${attributes.height}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetHeight:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { height: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
export const Width = Extension.create({
	name: 'width',

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
					width: {
						default: null,
						parseHTML: (element) => element.style.width?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.width) {
								return {};
							}

							return {
								style: `width: ${attributes.width}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetWidth:
				() =>
				({ chain }) => {
					return chain().setMark('textStyle', { width: null }).removeEmptyTextStyle().run();
				}
		};
	}
});
//#endregion
//region BACKGROUND
export const BackgroundImage = Extension.create({
	name: 'backgroundImage',

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
					backgroundImage: {
						default: null,
						parseHTML: (element) => element.style.backgroundImage?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.backgroundImage) {
								return {};
							}

							return {
								style: `background-image: ${attributes.backgroundImage}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBackgroundImage:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { backgroundImage: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BackgroundSize = Extension.create({
	name: 'backgroundSize',

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
					backgroundSize: {
						default: null,
						parseHTML: (element) => element.style.backgroundSize?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.backgroundSize) {
								return {};
							}

							return {
								style: `background-size: ${attributes.backgroundSize}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBackgroundSize:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { backgroundSize: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});

export const BackgroundColor = Extension.create({
	name: 'backgroundColor',

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
					backgroundColor: {
						default: null,
						parseHTML: (element) => element.style.backgroundColor?.replace(/['"]+/g, ''),
						renderHTML: (attributes) => {
							if (!attributes.backgroundColor) {
								return {};
							}

							return {
								style: `background-color: ${attributes.backgroundColor}`
							};
						}
					}
				}
			}
		];
	},
	addCommands() {
		return {
			unsetBackgroundColor:
				() =>
				({ chain }) => {
					return chain()
						.setMark('textStyle', { backgroundColor: null })
						.removeEmptyTextStyle()
						.run();
				}
		};
	}
});
