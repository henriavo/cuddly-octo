<script>
	import * as bootstrap from 'bootstrap';
	import Photo from './Photo.svelte';

	export function hitLike() {
		console.log('browser hit a like!');
	}
</script>

<main>
	<section class="py-5 text-center container">
		<div class="row py-lg-5">
			<div class="col-lg-6 col-md-8 mx-auto">
				<h1 class="fw-light">Album example</h1>
				<p class="lead text-muted">
					Something short and leading about the collection below—its contents, the creator, etc.
					Make it short and sweet, but not too short so folks don’t simply skip over it entirely.
				</p>
				<p />
			</div>
		</div>
	</section>

	<div class="album py-5 bg-light">
		<div class="container">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				<Photo />
				<Photo />
				<Photo />
			</div>
		</div>
	</div>
</main>
