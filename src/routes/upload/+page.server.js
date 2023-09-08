//var AWS = require("aws-sdk");
import { S3Client, ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('new photo uploaded!');
		console.log(data.get('photofile'));
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	console.log('aws s3 connecting...');
	const client = new S3Client({ region: 'us-east-2' });

	const params = {
		Bucket: 'henri-public-bucket', 
		Key: 'sample_upload.txt', 
		Body: 'hello world from chicago!' 
	};
	const command = new PutObjectCommand(params);

	const response = await client.send(command);
	console.log(response);
}
