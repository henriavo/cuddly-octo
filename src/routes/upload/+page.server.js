import https from 'https';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { fromIni, fromEnv } from '@aws-sdk/credential-providers';
import { formatUrl } from '@aws-sdk/util-format-url';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { Hash } from '@smithy/hash-node';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('photofile');

		if (file instanceof File === false || file.size === 0) {
			console.log('No file was uploaded!');
		} else {
			console.log('File uploaded!');
			// query db for next file name available. i.e. photo001.jpg or photo002.jpg
			// pass the file name to the uploadPicture function
			console.log(file);
			uploadPicture(file);
		}
	}
};

// ****************************************************************************************************
async function uploadPicture(file) {
	const REGION = 'us-east-2';
	const BUCKET = 'henri-public-bucket';
	const KEY = 'assasins005.jpg';

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



