<script>
	// below is how to access data = load() from other svelte components
	//import { page } from '$app/stores';
	// https://kit.svelte.dev/docs/load#$page-data

	export let imageUrl = 'fail.jpg';
	export let likeCount = 0;
	export let photoId;
	export let caption = 'hello world';

	async function addOneLike() {
		try {
			console.log('browser hit a like!');
			likeCount = likeCount + 1;
			let payload = { photoId, likeCount };
			const response = await fetch('/photos', {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'content-type': 'application/json'
				}
			});
		} catch (error) {
			console.error(`ERRORRR: ${error}`);
		}
	}
</script>

<div class="col">
	<div class="card shadow-sm">
		<img class="card-img-top" src={imageUrl} alt="" />
		<div class="card-body">
			<p class="card-text">
				{caption}
			</p>
			<button
				type="button"
				class="btn btn-primary btn-sm"
				data-bs-toggle="modal"
				data-bs-target="#{photoId}">View</button
			>
			<button type="button" class="btn btn-primary btn-sm" on:click={addOneLike}
				>❤️ {likeCount}</button
			>
		</div>
	</div>
</div>
