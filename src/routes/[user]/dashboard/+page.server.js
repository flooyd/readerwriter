import { ObjectId } from 'mongodb';
import { articles } from '../../../db/articles.js';

export const load = async ({ params, locals }) => {
	const fetchedArticles = await articles.find({ author: params.user }).toArray();
	return { articles: JSON.stringify(fetchedArticles), user: params.user };
};

/** @type {import('./$types').Actions} */
export const actions = {
	createArticle: async ({ request, locals }) => {
		const formData = await request.formData();
		const articlesLength = formData.get('articlesLength');
		const createdArticle = await articles.insertOne({
			title: 'Article - ' + articlesLength,
			content: crypto.randomUUID(),
			updatedAt: Date.now(),
			author: locals.user.username
		});
	},
	deleteArticle: async ({ request, locals }) => {
		const formData = await request.formData();
		const _id = formData.get('_id');
		console.log('delete', _id);
		try {
			await articles.deleteOne({ _id: ObjectId(_id) });
			return true;
		} catch (e) {
			console.error(e);
		}
	}
};
