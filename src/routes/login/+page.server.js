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
		return {
			status: 200,
			body: 'hello from login page'
		};
	}
};
