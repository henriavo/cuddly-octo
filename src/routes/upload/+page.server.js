//var AWS = require("aws-sdk");
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';

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
	const input = {
		// ListObjectsRequest
		Bucket: 'henri-public-bucket', // required
		// Delimiter: 'STRING_VALUE',
		// EncodingType: 'url',
		// Marker: 'STRING_VALUE',
		MaxKeys: Number('3'),
		// Prefix: 'STRING_VALUE',
		// RequestPayer: 'requester',
		// ExpectedBucketOwner: 'STRING_VALUE',
		OptionalObjectAttributes: [
			// OptionalObjectAttributesList
			'RestoreStatus'
		]
	};
	const command = new ListObjectsCommand(input);
	const response = await client.send(command);
	console.log(response);
}
