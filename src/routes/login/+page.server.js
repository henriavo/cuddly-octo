import { loginAttempt } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		//iterate over the form data and print to console
		console.log('hello from login page');
		const email = data.get('tux-cat');
		console.log(email);
		const pazz = data.get('tux-dog');
		console.log(pazz);
		const remember = data.get('tux-fish');
		console.log(remember);

		if (await loginAttempt(email, pazz)) {
			console.log('User found');
			throw redirect(307, '/upload');
		} else {
			console.log('User not found');
		}

		//  doesUserAlreadyExist(email);
		// does password match db password
		// if yes, set cookie
		// if no, return error
		// if user does not exist, return error
		// return 200
	}
};
