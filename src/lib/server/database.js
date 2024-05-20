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
const BUCKET_NAME = 'henri-public-bucket';
const USERS_COLLECTION = 'users';
const PICTURES_COLLECTION = 'pictures';

// ***************
// LOGIN USER
export async function loginAttempt(email, password) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(USERS_COLLECTION);
		const cursor = collection.find({ email: email, password: password });
		const count = await cursor.count();
		if (count !== 0) {
			console.log('User found');
			return true;
		} else {
			console.log('User not found');
			return false;
		}
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}

// ***************
// REGISTER USER

export async function doesUserAlreadyExist(email) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(USERS_COLLECTION);
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

export async function emailInAllowList(email) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const allowCollection = db.collection('allow');
		const allowRestult = await allowCollection.findOne({ email: email });
		if (allowRestult) {
			console.log('User allowed');
			return true;
		} else {
			console.log('User not allowed');
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
		const collection = db.collection(USERS_COLLECTION);
		await collection.insertOne({ email: email, password: password });
		console.log('User created successfully');
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}

// ***************
// UPLOAD PICTURE

export async function saveMetadataToDb(fileNumber, caption) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(PICTURES_COLLECTION);
		await collection.insertOne({
			_id: fileNumber,
			like_count: 0,
			s3_path: 's3://' + BUCKET_NAME + '/' + 'IMG_' + fileNumber + '.JPG',
			caption: caption,
			upload_date: new Date()
		});
		console.log('successful metadata save to db.');
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}

export async function getFileName() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(PICTURES_COLLECTION);
		const cursor = collection.find().sort({ _id: 1 });
		const rrr = await cursor.toArray();
		console.log('successful load from db.');
		return parseInt(rrr.pop()._id) + 1;
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}

// ***************
// DOWNLOAD PICTURE

export async function loadPicturesDb() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(PICTURES_COLLECTION);
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
