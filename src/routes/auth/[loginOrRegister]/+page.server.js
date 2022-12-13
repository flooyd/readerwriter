import { ObjectId } from 'mongodb';
import { users } from '../../../db/users';

export const load = async ({ params }) => {
	return { loginOrRegister: params.loginOrRegister };
};

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
	},
	register: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const username = formData.get('username');
		const password = formData.get('password');

		const foundUsername = await users.findOne({ username });
		if (foundUserName) {
			return 'blah';
		}
		const foundEmail = await users.findOne({ email });
		if (foundEmail) {
			return 'blah';
		}
	},
	updateUser: async ({ request }) => {
		const formData = await request.formData();
	},
	updateSettings: async ({ request }) => {
		const formData = await request.formData();
	}
};
