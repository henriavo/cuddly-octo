import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { fromIni, fromEnv } from '@aws-sdk/credential-providers';
import { formatUrl } from '@aws-sdk/util-format-url';
import { HttpRequest } from '@smithy/protocol-http';
import { parseUrl } from '@smithy/url-parser';
import { Hash } from '@smithy/hash-node';
import AmazonS3URI from 'amazon-s3-uri';
import axios from 'axios';

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
	try {
		const content = await file.arrayBuffer();
		const buffer = Buffer.from(content);

		const response = await axios.put(url, buffer, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Content-Length': file.size
			}
		});

		console.log(`Response from S3 status code: ${response.status}`);
		console.log('Upload to S3 is Done. Check your S3 console.');
	} catch (error) {
		console.error(error);
		throw error;
	}
}
