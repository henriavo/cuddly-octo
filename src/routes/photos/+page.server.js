import { loadPicturesS3 } from '$lib/server/awsS3';
import { loadPicturesDb } from '$lib/server/database';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const arrayresult = await loadPicturesDb();

	// print out contents of arrayresult
	for (let i = 0; i < arrayresult.length; i++) {
		console.log(
			'\t' +
				i +
				' ' +
				arrayresult[i]._id +
				' ' +
				arrayresult[i].like_count +
				' ' +
				arrayresult[i].s3_path +
				' ' +
				' ' +
				arrayresult[i].upload_date
		);
	}

	console.log('Found picture metadata for count: ' + arrayresult.length);

	const result = await loadPicturesS3(arrayresult);
	console.log(result);
	return result;
}




