import { loginAttempt } from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('tux-cat');
		const pazz = data.get('tux-dog');
		const remember = data.get('tux-fish');
		console.log(remember);

		if (await loginAttempt(email, pazz)) {
			console.log('User found');
			throw redirect(307, '/upload');
		} else {
			console.log('User not found');
			return fail(422, {
				email: data.get('email'),
				error: true
			});
		}

		//  doesUserAlreadyExist(email);
		// does password match db password
		// if yes, set cookie
		// if no, return error
		// if user does not exist, return error
		// return 200
	}
};
