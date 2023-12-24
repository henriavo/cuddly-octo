<script>
	import Modal from '../../utils/Modal.svelte';
	import Photo from '../../utils/Photo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	//console.log(data.photo);
</script>

<main>
	<div class="album py-5 bg-light">
		<div class="container">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				<Photo
					photoId="1409"
					likeCount={data.photo['IMG_1409.JPG'].likes}
					imageUrl={data.photo['IMG_1409.JPG'].url}
					caption="We were having lunch at the morton arboretum. She was looking for her lunch too 👀"
					timestamp={data.photo['IMG_1409.JPG'].elapsed}
				/>
				<Photo
					photoId="1408"
					likeCount={data.photo['IMG_1408.JPG'].count}
					imageUrl={data.photo['IMG_1408.JPG'].url}
					caption="This fluffy hoodie witht the ears is my favorite"
					timestamp={data.photo['IMG_1408.JPG'].elapsed}
				/>
				<Photo
					photoId="1407"
					likeCount={data.photo['IMG_1407.JPG'].count}
					imageUrl={data.photo['IMG_1407.JPG'].url}
					caption="Messy hair baby, she just woke up from a nap"
					timestamp={data.photo['IMG_1407.JPG'].elapsed}
				/>
				<Photo
					photoId="1406"
					likeCount={data.photo['IMG_1406.JPG'].count}
					imageUrl={data.photo['IMG_1406.JPG'].url}
					caption="This lamb onesie is cute"
					timestamp={data.photo['IMG_1406.JPG'].elapsed}
				/>
				<Photo
					photoId="1405"
					likeCount={data.photo['IMG_1405.JPG'].count}
					imageUrl={data.photo['IMG_1405.JPG'].url}
					caption="Big smile after a meal"
					timestamp={data.photo['IMG_1405.JPG'].elapsed}
				/>
				<Photo
					photoId="1400"
					likeCount={data.photo['IMG_1400.JPG'].count}
					imageUrl={data.photo['IMG_1400.JPG'].url}
					caption="Good morning baby"
					timestamp={data.photo['IMG_1400.JPG'].elapsed}
				/>
				<Photo
					photoId="1401"
					likeCount={data.photo['IMG_1401.JPG'].count}
					imageUrl={data.photo['IMG_1401.JPG'].url}
					caption="Mid day nap"
					timestamp={data.photo['IMG_1401.JPG'].elapsed}
				/>
				<Photo
					photoId="1403"
					likeCount={data.photo['IMG_1403.JPG'].count}
					imageUrl={data.photo['IMG_1403.JPG'].url}
					caption="With her best buddy Benny"
					timestamp={data.photo['IMG_1403.JPG'].elapsed}
				/>
				<Photo
					photoId="1404"
					likeCount={data.photo['IMG_1404.JPG'].count}
					imageUrl={data.photo['IMG_1404.JPG'].url}
					caption="A good nap after a meal"
					timestamp={data.photo['IMG_1404.JPG'].elapsed}
				/>
				<Photo
					photoId="1402"
					likeCount={data.photo['IMG_1402.JPG'].count}
					imageUrl={data.photo['IMG_1402.JPG'].url}
					caption="I'm getting good at this swadle thing"
					timestamp={data.photo['IMG_1402.JPG'].elapsed}
				/>
				<!-- TODO: handle null in likeArray -->
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
