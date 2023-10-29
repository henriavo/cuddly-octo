import https from 'https';
import { S3Client, ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { fromIni, fromEnv } from '@aws-sdk/credential-providers';
import { formatUrl } from '@aws-sdk/util-format-url';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { Hash } from '@smithy/hash-node';
import fs from 'fs';
import { type } from 'os';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const file = data.get('photofile');
		console.log('receive form post');
		// file object
		console.log(file);

		uploadPicture(file);
	}
};

// ****************************************************************************************************
async function uploadPicture(file) {
	const REGION = 'us-east-2';
	const BUCKET = 'henri-public-bucket';
	const KEY = 'winter.txt';
	// const KEY = 'assasins.jpg';

	try {
		const noClientUrl = await createPresignedUrlWithoutClientPut({
			region: REGION,
			bucket: BUCKET,
			key: KEY,
			ContentType: 'image/jpeg',
			Expires: 120 // 2 minutes
		});

		console.log('Presigned URL created!');
		//console.log(noClientUrl);

		//await put(noClientUrl, file);
		await put(noClientUrl, 'nadien sabe lo que va a pasar mañana');

		console.log('\nDone. Check your S3 console.');
	} catch (err) {
		console.error(err);
	}
}

const createPresignedUrlWithoutClientPut = async ({ region, bucket, key }) => {
	const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
	const presigner = new S3RequestPresigner({
		credentials: fromEnv(),
		region,
		sha256: Hash.bind(null, 'sha256')
	});

	const signedUrlObject = await presigner.presign(new HttpRequest({ ...url, method: 'PUT' }));
	return formatUrl(signedUrlObject);
};

function put(url, data) {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'PUT',
			headers: {
				//'Content-Type': 'image/jpeg', // Set appropriate content type
				'Content-Length': data.length
			}
		};

		const req = https.request(url, options, (res) => {
			let responseBody = '';
			res.on('data', (chunk) => {
				responseBody += chunk;
			});
			res.on('end', () => {
				resolve(responseBody);
			});
		});

		req.on('error', (err) => {
			reject(err);
		});
		req.write(data);
		req.end();
	});
}
