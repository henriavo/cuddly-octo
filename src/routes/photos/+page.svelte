<script>
	import Modal from '../../utils/Modal.svelte';
	import Photo from '../../utils/Photo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// console.log(data.photo);
</script>

<main>
	<div class="album py-5 bg-light">
		<div class="container">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				{#each Object.keys(data.photo) as photoId}
					<Photo
						{photoId}
						likeCount={data.photo[photoId].likes}
						imageUrl={data.photo[photoId].url}
						caption={data.photo[photoId].caption}
						timestamp={data.photo[photoId].elapsed}
					/>
				{/each}
			</div>
		</div>
	</div>
</main>

<Modal modalId="1400" imageUrl={data.photo['IMG_1400.JPG'].url} />
<Modal modalId="1401" imageUrl={data.photo['IMG_1401.JPG'].url} />
<Modal modalId="1402" imageUrl={data.photo['IMG_1402.JPG'].url} />
<Modal modalId="1403" imageUrl={data.photo['IMG_1403.JPG'].url} />
<Modal modalId="1404" imageUrl={data.photo['IMG_1404.JPG'].url} />
<Modal modalId="1405" imageUrl={data.photo['IMG_1405.JPG'].url} />
<Modal modalId="1406" imageUrl={data.photo['IMG_1406.JPG'].url} />
<Modal modalId="1407" imageUrl={data.photo['IMG_1407.JPG'].url} />
<Modal modalId="1408" imageUrl={data.photo['IMG_1408.JPG'].url} />
<Modal modalId="1409" imageUrl={data.photo['IMG_1409.JPG'].url} />
