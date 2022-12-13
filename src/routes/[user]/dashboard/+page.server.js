import { ObjectId } from 'mongodb';
import { articles } from '../../../db/articles.js';

export const load = async ({ params }) => {
	const fetchedArticles = await articles.find().toArray();
	return { articles: JSON.stringify(fetchedArticles), user: params.user };
};

/** @type {import('./$types').Actions} */
export const actions = {
	createArticle: async ({ request }) => {
		const formData = await request.formData();
		const articlesLength = formData.get('articlesLength');
		const createdArticle = await articles.insertOne({
			title: 'Article - ' + articlesLength,
			content: crypto.randomUUID(),
			updatedAt: Date.now()
		});
	},
	deleteArticle: async ({ request, locals }) => {
		const formData = await request.formData();
		const _id = formData.get('_id');
		try {
			await articles.deleteOne({ _id: ObjectId(_id) });

			console.log(`${_id} deleted.`);
			return true;
		} catch (e) {
			console.error(e);
		}
	},
	register: async (event) => {
		// TODO register the user
	}
};
