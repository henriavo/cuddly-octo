<script>
	import Modal from './Modal.svelte';
	export let imageUrl = 'fail.jpg';
	export let likeCount = 0;
	export let photoId;

	async function addOneLike() {
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

		likeCount = await response.json(); 
	}
</script>

<div class="col">
	<div class="card shadow-sm">
		<img class="card-img-top" src={imageUrl} alt="" />
		<div class="card-body">
			<p class="card-text">
				This is a wider card with supporting text below as a natural lead-in to additional content.
				This content is a little bit longer.
			</p>
			<button
				type="button"
				class="btn btn-primary btn-sm"
				data-bs-toggle="modal"
				data-bs-target="#close-up">View</button
			>
			<button type="button" class="btn btn-primary btn-sm" on:click={addOneLike}
				>❤️ {likeCount}</button
			>
		</div>
	</div>
</div>

<Modal />
