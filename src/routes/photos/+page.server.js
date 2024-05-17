import { loadPicturesS3 } from '$lib/server/awsS3';
import { MongoClient, ServerApiVersion } from 'mongodb';

import { USER_PASS } from '$env/static/private';
import { USER_NAME } from '$env/static/private';
import { MONGO_SERVER } from '$env/static/private';

const url = 'mongodb+srv://<<user>>:<<credential>>@<<server>>/?retryWrites=true&w=majority';
const fullUrl = url
	.replace('<<user>>', USER_NAME)
	.replace('<<credential>>', USER_PASS)
	.replace('<<server>>', MONGO_SERVER);

const client = new MongoClient(fullUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1
});

// const client = new MongoClient('mongodb://localhost:27017');
const DB_NAME = 'cuddly_octo';
const DB_COLLECTION = 'pictures';

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

async function loadPicturesDb() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(DB_COLLECTION);
		const cursor = collection.find().sort({ _id: 1 });
		const rrr = await cursor.toArray();
		console.log('successful load from db.');
		rrr.forEach(function (item, index) {
			console.log(
				'\t' +
					index +
					' ' +
					item._id +
					' ' +
					item.like_count +
					' ' +
					item.s3_path +
					' ' +
					' ' +
					item.upload_date
			);
			item.elapsed_days = getDaysElapsed(item.upload_date);
		});
		return rrr.reverse();
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}

function getDaysElapsed(dateStr1) {
	const date1 = new Date(dateStr1);
	const date2 = new Date();
	const diffMs = date2.getTime() - date1.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays < 8) return diffDays + ' Days Ago';
	if (diffDays < 15) {
		let weeks = diffDays / 7;
		return weeks + ' Weeks Ago';
	} else {
		//console.log('$$$ ' + date1.toDateString());
		return date1.toDateString();
	}
}
