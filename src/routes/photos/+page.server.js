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
	const arrayresult = loadLikes();
	const map = {};
	map['IMG_1400.JPG'] = await loadPictures('IMG_1400.JPG');
	map['IMG_1401.JPG'] = await loadPictures('IMG_1401.JPG');
	map['IMG_1402.JPG'] = await loadPictures('IMG_1402.JPG');
	map['IMG_1403.JPG'] = await loadPictures('IMG_1403.JPG');
	map['IMG_1404.JPG'] = await loadPictures('IMG_1404.JPG');
	map['IMG_1405.JPG'] = await loadPictures('IMG_1405.JPG');
	map['IMG_1406.JPG'] = await loadPictures('IMG_1406.JPG');
	map['IMG_1407.JPG'] = await loadPictures('IMG_1407.JPG');
	map['IMG_1408.JPG'] = await loadPictures('IMG_1408.JPG');
	map['IMG_1409.JPG'] = await loadPictures('IMG_1409.JPG');

	return { likesArray: arrayresult, photoUrls: map };
}

async function loadLikes() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(dbName);
		const collection = db.collection('picture_likes');
		const cursor = collection.find().sort({ _id: 1 });
		const rrr = await cursor.toArray();
		console.log('successful load from db.');
		rrr.forEach(function (item, index) {
			//console.log('\t' + index + ' ' + item._id + ' ' + item.count + ' ' + item.upload_date);
			item.elapsed_days = getDaysElapsed(item.upload_date);
		});
		return rrr;
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}

async function loadPictures(name) {
	const REGION = 'us-east-2';
	const BUCKET = 'henri-public-bucket';
	const KEY = name;

	try {
		const noClientUrl = await createPresignedUrlWithoutClient({
			region: REGION,
			bucket: BUCKET,
			key: KEY
		});

		console.log('Presigned URL created!');
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
