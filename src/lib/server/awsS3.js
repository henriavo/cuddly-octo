import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { fromIni, fromEnv } from '@aws-sdk/credential-providers';
import { formatUrl } from '@aws-sdk/util-format-url';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { Hash } from '@smithy/hash-node';
import AmazonS3URI from 'amazon-s3-uri';

export const BUCKET_NAME = 'henri-public-bucket';

// ****************
// DOWNLOAD PICTURE

export async function loadPicturesS3(array_result) {
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

		console.log('Presigned URL created!');
		console.log(noClientUrl);
		console.log('\n');

		return noClientUrl;
	} catch (err) {
		console.error(err);
	}
}

const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
	const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
	const presigner = new S3RequestPresigner({
		//credentials: fromIni(),
		credentials: fromEnv(),
		region,
		sha256: Hash.bind(null, 'sha256')
	});

	const signedUrlObject = await presigner.presign(new HttpRequest(url));
	return formatUrl(signedUrlObject);
};

// ***************
// UPLOAD PICTURE

export async function uploadPicture(file, fileNumber) {
	const REGION = 'us-east-2';
	const KEY = 'IMG_' + fileNumber + '.JPG';

	try {
		const noClientUrl = await createPresignedUrlWithoutClientPut({
			region: REGION,
			bucket: BUCKET_NAME,
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
		//credentials: fromIni(),
		credentials: fromEnv(),
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