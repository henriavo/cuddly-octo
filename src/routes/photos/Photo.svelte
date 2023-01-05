<script>
	import Modal from './Modal.svelte';
	export let imageUrl = 'fail.jpg';
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
				class="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#close-up">View</button
			>
			<button type="button" class="btn btn-primary">❤️</button>
		</div>
	</div>
</div>

<Modal hidden />
