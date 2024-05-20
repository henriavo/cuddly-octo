<script>
	let password;
	let confirm_password;
	export let form;
</script>

<main>
	<div class="container mt-4">
		<div class="card" style="width: 18rem;">
			<div class="card-header">Register</div>
			<div class="card-body">
				<form action="/register" method="POST">
					<div class="mb-3">
						<label for="email-reg" class="form-label">Email</label>
						<input
							type="text"
							value={form?.email ?? ''}
							class="form-control"
							id="email-reg"
							name="email"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="password-reg" class="form-label">Password</label>
						<input
							type="password"
							class="form-control"
							id="password-reg"
							name="password"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="password-conf-reg" class="form-label">Confirm Password</label>
						<input
							type="password"
							class="form-control"
							id="password-conf-reg"
							name="password-confirm"
							required
						/>
					</div>

					<button type="submit" class="btn btn-primary">Submit</button>
					<br />
					<br />
					{#if form?.error}
						<div class="alert alert-danger" role="alert">Passwords do not match</div>
					{/if}
					{#if form?.success}
						<div class="alert alert-primary" role="alert">Successfully registered!</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
</main>
