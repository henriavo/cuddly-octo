<script>
	import * as bootstrap from 'bootstrap';

	export function hitLike() {
		console.log('browser hit a like!');
	}
</script>

<!-- The Modal -->
<div
	class="modal fade"
	id="close-up"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<!-- Modal body -->
			<div class="modal-body">...</div>
		</div>
	</div>
</div>

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
				<div class="col">
					<div class="card shadow-sm">
						<img
							class="card-img-top"
							src="https://www.rollingstone.com/wp-content/uploads/2022/12/RollingStone_DaddyYankee-2.jpg"
							alt=""
						/>
						<div class="card-body">
							<p class="card-text">
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This content is a little bit longer.
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

				<div class="col">
					<div class="card shadow-sm">
						<img
							class="card-img-top"
							src="https://www.rollingstone.com/wp-content/uploads/2022/12/D4A3358.jpg"
							alt=""
						/>
						<div class="card-body">
							<p class="card-text">
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This content is a little bit longer.
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

				<div class="col">
					<div class="card shadow-sm">
						<!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
						<img
							class="card-img-top"
							src="https://www.rollingstone.com/wp-content/uploads/2022/12/220506_RollingStones_HarryStyles_SHOT_08_0083_RGB.jpg"
							alt=""
						/>
						<div class="card-body">
							<p class="card-text">
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This content is a little bit longer.
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
			</div>
		</div>
	</div>
</main>
