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
const dbName = 'cuddly_octo';

const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
	const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
	const presigner = new S3RequestPresigner({
		credentials: fromIni(),
		region,
		sha256: Hash.bind(null, 'sha256')
	});

	const signedUrlObject = await presigner.presign(new HttpRequest(url));
	return formatUrl(signedUrlObject);
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const arrayresult = loadPictureMetadata();

	//console.log(arrayresult); // Promise { <pending> }

	let array_result = await arrayresult;
	//console.log(array_result[0].s3_path);
	const map = {};

	//map['IMG_1400.JPG'] = await loadPictures();
	const { bucket: Bucket0, key: Key0 } = AmazonS3URI(array_result[0].s3_path);
	map[Key0] = {
		url: await loadPictures(Bucket0, Key0),
		likes: array_result[0].like_count,
		elapsed: array_result[0].elapsed_days
	};

	const { bucket: Bucket1, key: Key1 } = AmazonS3URI(array_result[1].s3_path);
	map[Key1] = {
		url: await loadPictures(Bucket1, Key1),
		likes: array_result[1].like_count,
		elapsed: array_result[1].elapsed_days
	};

	const { bucket: Bucket2, key: Key2 } = AmazonS3URI(array_result[2].s3_path);
	map[Key2] = {
		url: await loadPictures(Bucket2, Key2),
		likes: array_result[2].like_count,
		elapsed: array_result[2].elapsed_days
	};

	const { bucket: bucket3, key: key3 } = AmazonS3URI(array_result[3].s3_path);
	map[key3] = {
		url: await loadPictures(bucket3, key3),
		likes: array_result[3].like_count,
		elapsed: array_result[3].elapsed_days
	};

	const { bucket: bucket4, key: key4 } = AmazonS3URI(array_result[4].s3_path);
	map[key4] = {
		url: await loadPictures(bucket4, key4),
		likes: array_result[4].like_count,
		elapsed: array_result[4].elapsed_days
	};

	const { bucket: bucket5, key: key5 } = AmazonS3URI(array_result[5].s3_path);
	map[key5] = {
		url: await loadPictures(bucket5, key5),
		likes: array_result[5].like_count,
		elapsed: array_result[5].elapsed_days
	};

	const { bucket: bucket6, key: key6 } = AmazonS3URI(array_result[6].s3_path);
	map[key6] = {
		url: await loadPictures(bucket6, key6),
		likes: array_result[6].like_count,
		elapsed: array_result[6].elapsed_days
	};

	const { bucket: bucket7, key: key7 } = AmazonS3URI(array_result[7].s3_path);
	map[key7] = {
		url: await loadPictures(bucket7, key7),
		likes: array_result[7].like_count,
		elapsed: array_result[7].elapsed_days
	};

	const { bucket: bucket8, key: key8 } = AmazonS3URI(array_result[8].s3_path);
	map[key8] = {
		url: await loadPictures(bucket8, key8),
		likes: array_result[8].like_count,
		elapsed: array_result[8].elapsed_days
	};

	const { bucket: bucket9, key: key9 } = AmazonS3URI(array_result[9].s3_path);
	map[key9] = {
		url: await loadPictures(bucket9, key9),
		likes: array_result[9].like_count,
		elapsed: array_result[9].elapsed_days
	};

	return { photo: map };
	// return { likesArray: arrayresult, photoUrls: map };
}

async function loadPictureMetadata() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(dbName);
		const collection = db.collection('pictures');
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
		return rrr;
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
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

function getDaysElapsed(dateStr1) {
	//console.log('$$$ ' + dateStr1);
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
