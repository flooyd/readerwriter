import { MongoClient } from 'mongodb';
import { MONGO_URL } from '$env/static/private';

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

export async function start_mongo() {
	console.log('MONGO_URL', MONGO_URL);
	console.log('Starting mongo...');
	return await client.connect();
}

export default client.db('readerwriter');
