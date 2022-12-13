import db from './mongo.js';

export const articles = db.collection('articles');
