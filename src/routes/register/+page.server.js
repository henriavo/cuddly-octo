import * as db from '$lib/server/database.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		console.log(email);
		const password = data.get('password');
		console.log(password);
		const password_confirm = data.get('password');
		console.log(password_confirm);
		if (!(await db.doesUserAlreadyExist(email))) {
			await db.createUser(email, password);
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
