import { ObjectId } from 'mongodb';
import { invalid, redirect } from '@sveltejs/kit';
import { users } from '../../../db/users';
import bcrypt from 'bcrypt';
import validator from 'validator';

export const load = async ({ params }) => {
	return { loginOrRegister: params.loginOrRegister };
};

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		let errors = {};

		if (!email) {
			errors.emailRequired = 'This field is required.';
		}

		if (!password) {
			errors.passwordRequired = 'This field is required.';
		}

		if (!validator.isEmail(email)) {
			errors.notEmail = 'Email must be an email address.';
		}
		if (!validator.isLength(password, { min: 8, max: 64 })) {
			errors.invalidPassword = 'Password must be between 8 and 64 characters.';
		}

		if (Object.keys(errors).length !== 0) {
			return invalid(422, errors);
		}

		const user = await users.findOne({ email });

		if (user) {
			const match = await bcrypt.compare(password, user.password);

			if (match) {
				const updatedUser = await users.findOneAndUpdate(
					{ _id: ObjectId(user._id) },
					{ $set: { auth: crypto.randomUUID() } },
					{ returnDocument: 'after' }
				);

				cookies.set('session', updatedUser.value.auth, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
					maxAge: 60 * 60 * 24 * 30
				});

				throw redirect(302, '/');
			}
		} else {
			return invalid(401, { invalidUser: 'Invalid email or password.' });
		}
	},
	register: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const username = formData.get('username');
		const password = formData.get('password');
		let errors = {};

		if (!email) {
			errors.emailRequired = 'This field is required.';
		}

		if (!username) {
			errors.usernameRequired = 'This field is required.';
		}

		if (!password) {
			errors.passwordRequired = 'This field is required.';
		}

		if (!validator.isEmail(email)) {
			errors.notEmail = 'Email must be an email address.';
		}
		if (!validator.isLength(username, { min: 1, max: 32 })) {
			errors.invalidUsername = 'Username must be between 1 and 32 characters.';
		}
		if (!validator.isLength(password, { min: 8, max: 64 })) {
			errors.invalidPassword = 'Password must be between 8 and 64 characters.';
		}

		if (Object.keys(errors).length !== 0) {
			return invalid(422, errors);
		}

		const foundUsername = await users.findOne({ username });
		if (foundUsername) {
			return invalid(401, { notUnique: 'A user with this email or username already exists.' });
		}
		const foundEmail = await users.findOne({ email });
		if (foundEmail) {
			return invalid(401, { notUnique: 'A user with this email or username already exists.' });
		}

		const hash = bcrypt.hashSync(password, 12);

		await users.insertOne({ email, username, password: hash, auth: crypto.randomUUID() });

		throw redirect(307, '/auth/login');
	},
	updateUser: async ({ request }) => {
		const formData = await request.formData();
	},
	updateSettings: async ({ request }) => {
		const formData = await request.formData();
	}
};
