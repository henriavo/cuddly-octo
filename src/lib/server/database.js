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
const DB_COLLECTION = 'users';


export async function doesUserAlreadyExist(email) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(DB_COLLECTION);
		const cursor = collection.find({ email: email });
		const count = await cursor.count();
		if (count !== 0) {
			console.log('User already exists');
			return true;
		} else {
			console.log('User does not exist');
			return false;
		}
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}

export async function createUser(email, password) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(DB_COLLECTION);
		const result = await collection.insertOne({ email: email, password: password });
		console.log('User created successfully');
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}