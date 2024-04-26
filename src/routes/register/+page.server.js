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

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		console.log(email);
		const password = data.get('password');
		console.log(password);
		const password_confirm = data.get('password');
		console.log(password_confirm);
		await doesUserAlreadyExist(email);
	}
};

async function doesUserAlreadyExist(email) {
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

// REGISTGER PAGE
// connect to Mongo DB
// query and check for duplicate email. SELECT * FROM USERS WHERE email = email. if count!=0, return error message.
// if no duplicate, create new user. INSERT INTO USERS (email, password) VALUES (email, password).

// LOGIN PAGE
// connect to Mongo DB
// query and check for email. SELECT * FROM USERS WHERE email = email. if count==0, return error message.
// if email exists, check password. SELECT * FROM USERS WHERE email = email AND password = password. if count==0, return error message.
// if password matches, return success message.
//

