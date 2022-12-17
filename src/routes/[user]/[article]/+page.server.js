import { ObjectId } from 'mongodb';
import { articles } from '../../../db/articles.js';
import { selections } from '../../../db/selections.js';

export const load = async ({ params }) => {
	const fetchedArticle = await articles.findOne({ title: params.article, author: params.user });
	fetchedArticle._id = fetchedArticle._id.toString();
	const fetchedSelections = await selections.find({ articleId: fetchedArticle._id }).toArray();
	return {
		article: JSON.stringify(fetchedArticle),
		user: params.user,
		selections: JSON.stringify(fetchedSelections)
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	save: async ({ request, locals }) => {
		const formData = await request.formData();
		const article = JSON.parse(formData.get('article'));
		if (locals.user.username !== article.author) {
			return;
		}
		await articles.updateOne(
			{ _id: ObjectId(article._id) },
			{ $set: { content: article.content, updatedAt: Date.now(), title: article.title } }
		);
	},
	saveSelection: async ({ request, locals }) => {
		const formData = await request.formData();
		const article = JSON.parse(formData.get('article'));
		const selection = JSON.parse(formData.get('selection'));
		if (locals.user.username !== article.author) {
			return;
		}
		await selections.insertOne({
			selectionStart: selection.selectionStart,
			selectionEnd: selection.selectionEnd,
			style: selection.style,
			articleId: article._id
		});
	}
};
