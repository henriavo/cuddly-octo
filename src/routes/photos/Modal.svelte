<script>
	export let imageUrl = 'fail.jpg';
</script>

<!-- The Modal -->
<div
	class="modal fade"
	id="close-up"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<!-- Modal body -->
			<div class="modal-body">
				<img src={imageUrl} class="img-fluid" alt="..." />
			</div>
		</div>
	</div>
</div>
