import * as db from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const password_confirm = data.get('password-confirm');

		if (password !== password_confirm) {
			console.log('Passwords do not match!');
			return fail(422, {
				email: data.get('email'),
				error: 'Passwords do not match'
			});
		} else if (await db.doesUserAlreadyExist(email)) {
			console.log('User already exists!');
			return fail(403, {
				email: data.get('email'),
				error: 'Error registering user'
			});
		} else if (!(await db.emailInAllowList(email))) {
			console.log('Email not in allow list!');
			return fail(403, {
				email: data.get('email'),
				error: 'Error registering user'
			});
		} else {
			await db.createUser(email, password);
			console.log('User created successfully.');
		}
	}
};

// LOGIN PAGE
// connect to Mongo DB
// query and check for email. SELECT * FROM USERS WHERE email = email. if count==0, return error message.
// if email exists, check password. SELECT * FROM USERS WHERE email = email AND password = password. if count==0, return error message.
// if password matches, return success message.
//
