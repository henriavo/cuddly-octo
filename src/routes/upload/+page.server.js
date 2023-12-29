import { MongoClient, ServerApiVersion } from 'mongodb';

import { USER_PASS } from '$env/static/private';
import { USER_NAME } from '$env/static/private';
import { MONGO_SERVER } from '$env/static/private';

import https from 'https';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { fromIni, fromEnv } from '@aws-sdk/credential-providers';
import { formatUrl } from '@aws-sdk/util-format-url';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { Hash } from '@smithy/hash-node';
import { get } from 'http';

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

const BUCKET_NAME = 'henri-public-bucket';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('photofile');

		if (file instanceof File === false || file.size === 0) {
			console.log('No file was uploaded!');
		} else {
			console.log('File uploaded!');
			let fileNumber = await getFileName();
			console.log('$$$$: ' + fileNumber);
			//console.log(file);
			uploadPicture(file, fileNumber);
			saveMetadataToDb(fileNumber);
		}
	}
};

// ****************************************************************************************************

async function saveMetadataToDb(fileNumber) {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(dbName);
		const collection = db.collection('pictures');
		const r = await collection.insertOne({
			_id: fileNumber,
			like_count: 0,
			s3_path: 's3://' + BUCKET_NAME + '/' + 'IMG_' + fileNumber + '.JPG',
			upload_date: new Date()
		});
		console.log('successful metadata save to db.');
	} catch (error) {
		console.error(`ERRORRR: ${error}`);
	} finally {
		await client.close();
	}
}
async function getFileName() {
	try {
		await client.connect();
		console.log('connected successfully to mongo db.');
		const db = client.db(dbName);
		const collection = db.collection('pictures');
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

async function uploadPicture(file, fileNumber) {
	const REGION = 'us-east-2';
	const BUCKET = BUCKET_NAME;
	const KEY = 'IMG_' + fileNumber + '.JPG';

	try {
		const noClientUrl = await createPresignedUrlWithoutClientPut({
			region: REGION,
			bucket: BUCKET,
			key: KEY,
			ContentType: 'image/jpeg',
			Expires: 120 // 2 minutes
		});

		console.log('Presigned URL created!');

		await put(noClientUrl, file);
	} catch (err) {
		console.error(err);
	}
}

const createPresignedUrlWithoutClientPut = async ({ region, bucket, key }) => {
	const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
	const presigner = new S3RequestPresigner({
		credentials: fromIni(),
		region,
		sha256: Hash.bind(null, 'sha256')
	});

	const signedUrlObject = await presigner.presign(new HttpRequest({ ...url, method: 'PUT' }));
	return formatUrl(signedUrlObject);
};

async function put(url, file) {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'multipart/form-data',
				'Content-Length': file.size
			}
		};

		const req = https.request(url, options, (res) => {
			console.log(`Response from S3 status code: ${res.statusCode}`);
		});

		req.on('error', (error) => {
			console.error(error);
			reject(error);
		});

		try {
			file
				.arrayBuffer()
				.then((content) => {
					const buffer = Buffer.from(content);
					//console.log(buffer); image contents
					req.write(buffer);
					req.end();
				})
				.catch((error) => {
					console.error(error);
					reject(error);
				});
			console.log('Upload to S3 is Done. Check your S3 console.');
			resolve();
		} catch (error) {
			console.error(error);
			reject(error);
		}
	});
}
