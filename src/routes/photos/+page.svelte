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

<Modal modalId="1100" imageUrl={data.photo['IMG_1100.JPG'].url} />
<Modal modalId="1101" imageUrl={data.photo['IMG_1101.JPG'].url} />
<Modal modalId="1102" imageUrl={data.photo['IMG_1102.JPG'].url} />
<Modal modalId="1103" imageUrl={data.photo['IMG_1103.JPG'].url} />
<Modal modalId="1104" imageUrl={data.photo['IMG_1104.JPG'].url} />
<Modal modalId="1105" imageUrl={data.photo['IMG_1105.JPG'].url} />
<Modal modalId="1106" imageUrl={data.photo['IMG_1106.JPG'].url} />
<Modal modalId="1107" imageUrl={data.photo['IMG_1107.JPG'].url} />
<Modal modalId="1108" imageUrl={data.photo['IMG_1108.JPG'].url} />
<Modal modalId="1109" imageUrl={data.photo['IMG_1109.JPG'].url} />
