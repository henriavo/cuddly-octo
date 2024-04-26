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
	}
};
