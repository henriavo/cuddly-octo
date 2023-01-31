// import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

const url =
	'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
const client = new MongoClient(url);
const dbName = 'cuddly_octo';

async function run() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db');
		const db = client.db(dbName);
		const collection = db.collection('picture_likes');
		const cursor = collection.find().sort({ _id: 1 });
		const rrr = await cursor.toArray();
		rrr.forEach(function (item, index) {
			console.log('=== ' + index + ' ' + item._id + ' ' + item.count);
		});
		return rrr;
	} finally {
		await client.close();
	}
}

/** @type {import('./$types').RequestHandler} */
export function POST({ request }) {
	//RequestEvent     ^

	// let capture;

	request.json().then((x) => console.log(x));
	console.log('......');

	run().catch(console.dir);
	console.log("i'm on the server! i got your POST request.");

	let playerS = { name: 'doncic', team: 'mavs', number: 77 };
	return new Response(String(JSON.stringify(playerS))); //Response
}

// /** @type {import('./$types').RequestHandler} */
// export function GET({ url }) {
// 	console.log("i'm on the server! i got your GET request.");
// 	return new json("hello. i'm a respnose from server");
// }
