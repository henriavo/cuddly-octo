import { MongoClient, ServerApiVersion } from 'mongodb';

import { USER_PASS } from '$env/static/private';
import { USER_NAME } from '$env/static/private';
import { MONGO_SERVER } from '$env/static/private';

import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { fromIni, fromEnv } from '@aws-sdk/credential-providers';
import { formatUrl } from '@aws-sdk/util-format-url';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { Hash } from '@smithy/hash-node';
import AmazonS3URI from 'amazon-s3-uri';

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
const DB_COLLECTION = 'pictures';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const arrayresult = await loadPicturesDb();

	console.log('Found picture metadata for count: ' + arrayresult.length);

	return await loadPicturesS3(arrayresult);
}

async function loadPicturesS3(array_result) {
	const map = {};

	for (let i = 0; i < array_result.length; i++) {
		const { bucket, key } = AmazonS3URI(array_result[i].s3_path);
		map[key] = {
			url: await loadPictures(bucket, key),
			likes: array_result[i].like_count,
			caption: array_result[i].caption,
			elapsed: array_result[i].elapsed_days
		};
	}
	//look through map and print out the keys
	// for (const key in map) {
	// 	console.log(key);
	// }

	return { photo: map };
}

async function loadPicturesDb() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(DB_NAME);
		const collection = db.collection(DB_COLLECTION);
		const cursor = collection.find().sort({ _id: 1 });
		const rrr = await cursor.toArray();
		console.log('successful load from db.');
		rrr.forEach(function (item, index) {
			// console.log(
			// 	'\t' +
			// 		index +
			// 		' ' +
			// 		item._id +
			// 		' ' +
			// 		item.like_count +
			// 		' ' +
			// 		item.s3_path +
			// 		' ' +
			// 		' ' +
			// 		item.upload_date
			// );
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

async function loadPictures(bucket, key) {
	const REGION = 'us-east-2';
	const BUCKET = bucket;
	const KEY = key;

	try {
		const noClientUrl = await createPresignedUrlWithoutClient({
			region: REGION,
			bucket: BUCKET,
			key: KEY
		});

		//console.log('Presigned URL created!');
		// console.log(noClientUrl);
		// console.log('\n');

		return noClientUrl;
	} catch (err) {
		console.error(err);
	}
}

const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
	const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
	const presigner = new S3RequestPresigner({
		// credentials: fromIni(),
		credentials: fromEnv(),
		region,
		sha256: Hash.bind(null, 'sha256')
	});

	const signedUrlObject = await presigner.presign(new HttpRequest(url));
	return formatUrl(signedUrlObject);
};
