import db from './mongo.js';

export const users = db.collection('users');
