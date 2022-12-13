import { ObjectId } from 'mongodb';
import { articles } from '../../../db/articles.js';

export const load = async ({ params }) => {
	console.log(params);
	const fetchedArticle = await articles.findOne({ title: params.article });
	return { article: JSON.stringify(fetchedArticle), user: params.user };
};
