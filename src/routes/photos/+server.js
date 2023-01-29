// import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function POST({ reqeustEvent }) {
	console.log(typeof reqeustEvent);

	console.log("i'm on the server! i got your POST request.");

	return new json("hello. i'm a respnose from server");
}

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	console.log("i'm on the server! i got your GET request.");
	return new json("hello. i'm a respnose from server");
}
