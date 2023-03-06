<script>
	import Modal from '../../utils/Modal.svelte';
	import Photo from '../../utils/Photo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
	<div class="album py-5 bg-light">
		<div class="container">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				<Photo
					photoId="1409"
					likeCount={data.likesArray[9].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1409.JPG"
					caption="We were having lunch at the morton arboretum. She was looking for her lunch too 👀"
					timestamp={data.likesArray[9].elapsed_days}
				/>
				<Photo
					photoId="1408"
					likeCount={data.likesArray[8].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1408.JPG"
					caption="This fluffy hoodie witht the ears is my favorite"
					timestamp={data.likesArray[8].elapsed_days}
				/>
				<Photo
					photoId="1407"
					likeCount={data.likesArray[7].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1407.JPG"
					caption="Messy hair baby, she just woke up from a nap"
					timestamp={data.likesArray[7].elapsed_days}
				/>
				<Photo
					photoId="1406"
					likeCount={data.likesArray[6].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1406.JPG"
					caption="This lamb onesie is cute"
					timestamp={data.likesArray[6].elapsed_days}
				/>
				<Photo
					photoId="1405"
					likeCount={data.likesArray[5].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1405.JPG"
					caption="Big smile after a meal"
					timestamp={data.likesArray[5].elapsed_days}
				/>
				<Photo
					photoId="1400"
					likeCount={data.likesArray[0].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1400.JPG"
					caption="Good morning baby"
					timestamp={data.likesArray[0].elapsed_days}
				/>
				<Photo
					photoId="1401"
					likeCount={data.likesArray[1].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1401.JPG"
					caption="Mid day nap"
					timestamp={data.likesArray[1].elapsed_days}
				/>
				<Photo
					photoId="1403"
					likeCount={data.likesArray[3].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1403.JPG"
					caption="With her best buddy Benny"
					timestamp={data.likesArray[3].elapsed_days}
				/>
				<Photo
					photoId="1404"
					likeCount={data.likesArray[4].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1404.JPG"
					caption="A good nap after a meal"
					timestamp={data.likesArray[4].elapsed_days}
				/>
				<Photo
					photoId="1402"
					likeCount={data.likesArray[2].count}
					imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1402.JPG"
					caption="I'm getting good at this swadle thing"
					timestamp={data.likesArray[2].elapsed_days}
				/>
				<!-- TODO: handle null in likeArray -->
			</div>
		</div>
	</div>
</main>

<Modal
	modalId="1400"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1400.JPG"
/>
<Modal
	modalId="1401"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1401.JPG"
/>
<Modal
	modalId="1402"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1402.JPG"
/>
<Modal
	modalId="1403"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1403.JPG"
/>
<Modal
	modalId="1404"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1404.JPG"
/>
<Modal
	modalId="1405"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1405.JPG"
/>
<Modal
	modalId="1406"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1406.JPG"
/>
<Modal
	modalId="1407"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1407.JPG"
/>
<Modal
	modalId="1408"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1408.JPG"
/>
<Modal
	modalId="1409"
	imageUrl="https://henri-public-bucket.s3.us-east-2.amazonaws.com/IMG_1409.JPG"
/>
