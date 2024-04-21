<div id="uploadprompt" class="h-100 d-flex align-items-center justify-content-center">
	<form method="post" enctype="multipart/form-data">
		<div class="mb-3">
			<input name="photofile" class="form-control" type="file" id="formFile" accept="image/jpeg" />
			<br />
			<input name="caption" class="form-control" type="text" placeholder="enter a caption here" />
		</div>

		<br />
		<div>
			<button>Submit</button>
		</div>
	</form>
</div>

<style>
	#uploadprompt {
		padding-top: 120px;
	}
</style>
