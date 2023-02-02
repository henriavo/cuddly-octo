// import { error } from '@sveltejs/kit';
// import { json } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

const url =
	'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
const client = new MongoClient(url);
const dbName = 'cuddly_octo';

async function run(x) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db');
		const db = client.db(dbName);
		const collection = db.collection('picture_likes');
		//TODO: increment current like count by 1. update db for given _id
		const query = { _id: Number(x.photoId) };
		const update = { $set: { count: Number(x.likeCount) } };
		const options = { upsert: true };
		console.log(query);
		const result = await collection.updateOne(query, update, options);
		console.log(
			`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
		);

		return Number(x.likeCount);
	} finally {
		await client.close();
	}
}

/** @type {import('./$types').RequestHandler} */
export function POST({ request }) {
	//RequestEvent     ^
	let newCount;
	request.json().then((x) => {
		console.log(x.photoId + ' >>> ' + x.likeCount);
		run(x).catch(console.dir);
		newCount = x.likeCount;
	});

	console.log("i'm on the server! i got your POST request.");

	//let playerS = { name: 'doncic', team: 'mavs', number: 77 };
	return new Response(String(newCount)); //Response
}

// /** @type {import('./$types').RequestHandler} */
// export function GET({ url }) {
// 	console.log("i'm on the server! i got your GET request.");
// 	return new json("hello. i'm a respnose from server");
// }
