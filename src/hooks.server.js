import { start_mongo } from './db/mongo.js';
import { users } from './db/users';

start_mongo()
	.then(() => {})
	.catch((err) => {
		console.error(err);
	});

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	const user = await users.findOne({ auth: session });

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
}
