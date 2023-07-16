/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('new photo uploaded!');
		console.log(data.get('photofile'));
	}
};
