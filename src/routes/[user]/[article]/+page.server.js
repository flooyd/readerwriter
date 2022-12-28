import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { articles } from '../../../db/articles.js';
import { selections } from '../../../db/selections.js';

export const load = async ({ params }) => {
	console.log('LOAD');
	const fetchedArticle = await articles.findOne({ title: params.article, author: params.user });
	if (!fetchedArticle) {
		throw error(401, 'Article not found');
	}
	return {
		article: JSON.stringify(fetchedArticle),
		user: params.user
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	save: async ({ request, locals }) => {
		console.log('save');
		const formData = await request.formData();
		const article = JSON.parse(formData.get('article'));
		console.log(article);
		if (locals.user.username !== article.author) {
			return;
		}
		const result = await articles.updateOne(
			{ _id: ObjectId(article._id) },
			{ $set: { content: article.content, updatedAt: Date.now() } }
		);
	},
	saveTitle: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const article = JSON.parse(formData.get('article'));
		if (locals.user.username !== params.user) {
			return;
		}
		const result = await articles.updateOne(
			{ _id: ObjectId(article._id) },
			{ $set: { title: article.title, updatedAt: Date.now() } }
		);
	}
};
