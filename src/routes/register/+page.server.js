import * as db from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		console.log(email);
		const password = data.get('password');
		console.log(password);
		const password_confirm = data.get('password-confirm');
		console.log(password_confirm);

		if (password !== password_confirm) {
			console.log('Passwords do not match');
			return fail(422, {
				email: data.get('email'),
				password: data.get('password'),
				password_confirm: data.get('password-confirm'),
				error: 'Passwords do not match'
			});
		}

		if (!(await db.doesUserAlreadyExist(email)) && (await db.emailInAllowList(email))) {
			await db.createUser(email, password);
			console.log('User created successfully');
			return { success: true };
		}
	}
};

// REGISTGER PAGE
// connect to Mongo DB
// query and check for duplicate email. SELECT * FROM USERS WHERE email = email. if count!=0, return error message.
// if no duplicate, create new user. INSERT INTO USERS (email, password) VALUES (email, password).

// LOGIN PAGE
// connect to Mongo DB
// query and check for email. SELECT * FROM USERS WHERE email = email. if count==0, return error message.
// if email exists, check password. SELECT * FROM USERS WHERE email = email AND password = password. if count==0, return error message.
// if password matches, return success message.
//
