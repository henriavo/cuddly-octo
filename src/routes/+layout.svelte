<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
	<symbol id="house" viewBox="0 0 16 16">
		<path
			d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"
		/>
	</symbol>
	<symbol id="camera" viewBox="0 0 16 16">
		<path
			d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"
		/>
		<path
			d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
		/>
	</symbol>
</svg>

<header>
	<div class="px-3 py-2 text-bg-dark">
		<div class="container">
			<div
				class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start"
			>
				<a
					href="/"
					class="d-flex align-items-center my-2 my-sm-0 me-sm-auto text-white text-decoration-none"
				>
					<svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"
						><use xlink:href="#house" /></svg
					>
				</a>

				<ul class="nav col-12 col-sm-auto my-2 justify-content-center my-md-0 text-small">
					<li>
						<a href="/photos" class="nav-link text-white">
							<svg class="bi d-block mx-auto mb-1" width="40" height="32"
								><use xlink:href="#camera" /></svg
							>
							Photos
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</header>

<slot />

<style>
	.text-small {
		font-size: 85%;
	}

	.bi {
		vertical-align: -0.125em;
		fill: currentColor;
	}
</style>
