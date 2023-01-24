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

		const query = { _id: 7049 };
		const options = {
			projection: { _id: 0, count: 1 }
		};

		const result = await collection.findOne(query, options);

		console.log('$$$ ' + result.count);

		return result;
	} finally {
		await client.close();
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const result = run().catch(console.dir);
	return { data: result };
	// return { data: { count: 266 } };
}
