import { MongoClient } from 'mongodb';

const url =
	'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';
const client = new MongoClient(url);
const dbName = 'cuddly_octo';

async function run() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(dbName);
		const collection = db.collection('picture_likes');
		const cursor = collection.find().sort({ _id: 1 });
		const rrr = await cursor.toArray();
		console.log('successful load from db. all records below:');
		rrr.forEach(function (item, index) {
			console.log('\t' + index + ' ' + item._id + ' ' + item.count);
		});
		return rrr;
	} finally {
		await client.close();
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const arrayresult = run().catch(console.dir);
	return { likesArray: arrayresult };
}
