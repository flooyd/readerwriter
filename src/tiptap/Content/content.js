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
