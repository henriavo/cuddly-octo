import { MongoClient } from 'mongodb';

const url =
	'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
const client = new MongoClient(url);
const dbName = 'cuddly_octo';

async function run(data) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db');
		const db = client.db(dbName);
		const collection = db.collection('picture_likes');
		const query = { _id: Number(data.photoId) };
		const update = { $set: { count: Number(data.likeCount) } };
		const options = { upsert: true };
		const result = await collection.updateOne(query, update, options);
		console.log(
			`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
		);

		return Number(data.likeCount);
	} finally {
		await client.close();
	}
}

/** @type {import('./$types').RequestHandler} */
export function POST({ request }) {
	//RequestEvent     ^
	console.log('server received POST request for like update of records below:');
	let newCount;
	request.json().then((payload) => {
		console.log('\t' + payload.photoId + ' >>> ' + payload.likeCount);
		run(payload).catch(console.dir);
		newCount = payload.likeCount;
	});

	return new Response(String(newCount));
}
