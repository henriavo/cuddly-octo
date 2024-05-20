<main>
	<div class="container mt-4">
		<div class="card" style="width: 18rem;">
			<div class="card-header">Login</div>
			<div class="card-body">
				<form action="?/login" method="POST">
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">Email</label>
						<input
							name="tux-cat"
							type="email"
							class="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">Password</label>
						<input name="tux-dog" type="password" class="form-control" id="exampleInputPassword1" />
					</div>
					<div class="form-check">
						<input name="tux-fish" type="checkbox" class="form-check-input" id="exampleCheck1" />
						<label class="form-check-label" for="exampleCheck1">Remember me</label>
					</div>
					<br />
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	</div>
</main>
