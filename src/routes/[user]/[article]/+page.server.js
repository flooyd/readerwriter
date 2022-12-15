import { ObjectId } from 'mongodb';
import { articles } from '../../../db/articles.js';

export const load = async ({ params }) => {
	const fetchedArticle = await articles.findOne({ title: params.article, author: params.user });
	return { article: JSON.stringify(fetchedArticle), user: params.user };
};

/** @type {import('./$types').Actions} */
export const actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const article = JSON.parse(formData.get('article'));
		await articles.updateOne(
			{ _id: ObjectId(article._id) },
			{ $set: { content: article.content, updatedAt: Date.now(), title: article.title } }
		);
	}
};
