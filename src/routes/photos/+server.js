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
