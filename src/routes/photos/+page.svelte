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
				<Photo
					photoId="1400"
					likeCount={data.likesArray[0].count}
					imageUrl="s3://henri-public-bucket/IMG_1400.JPG"
				/>
				<Photo
					photoId="1401"
					likeCount={data.likesArray[1].count}
					imageUrl="s3://henri-public-bucket/IMG_1401.JPG"
				/>
				<Photo
					photoId="1402"
					likeCount={data.likesArray[2].count}
					imageUrl="s3://henri-public-bucket/IMG_1402.JPG"
				/>
				<Photo
					photoId="1403"
					likeCount={data.likesArray[2].count}
					imageUrl="s3://henri-public-bucket/IMG_1403.JPG"
				/>
			</div>
		</div>
	</div>
</main>
