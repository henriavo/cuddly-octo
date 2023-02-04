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
