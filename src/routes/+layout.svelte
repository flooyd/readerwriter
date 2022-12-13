<div class="layout">
	<nav>
		<div>
			<a class="title" href="/">Read and Write</a>
		</div>
		<div class="links">
			<a href="/demo/dashboard">Demo</a>
			<a href="/about">About</a>
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		</div>
	</nav>

	<slot />
</div>

<style>
	.layout {
		background: white;
		height: 100vh;
		font-family: 'Oswald', sans-serif;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		background: #333;
		margin: 0px;
		padding: 4px 20px;
	}

	.title {
		font-size: 25px;
		font-family: 'Lobster', cursive;
	}

	a {
		color: white;
		text-decoration: none;
	}

	.links a {
		margin-left: 13px;
	}
</style>
