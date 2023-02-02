<script>
	import Photo from '../../utils/Photo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
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
				<Photo photoId="6011" likeCount={data.data[0].count} />
				<Photo photoId="6037" likeCount={data.data[1].count} />
				<Photo photoId="7049" likeCount={data.data[2].count} />
			</div>
		</div>
	</div>

	<form method="POST">
		<label>
			Test a form action handler
			<button>GO</button>
		</label>
	</form>

	<br />
	<br />
	<br />
</main>
