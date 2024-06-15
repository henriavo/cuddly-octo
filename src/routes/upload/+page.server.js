import { uploadPicture } from '$lib/server/awsS3';
import { getFileName, saveMetadataToDb } from '$lib/server/database';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('photofile');
		const caption = formData.get('caption');

		if (file instanceof File === false || file.size === 0) {
			console.log('No file was uploaded!');
		} else {
			let fileNumber = await getFileName();
			console.log('$$$$: ' + fileNumber);
			//console.log(file);
			uploadPicture(file, fileNumber);
			saveMetadataToDb(fileNumber, caption);
			console.log('File uploaded!');
		}
	}
};
