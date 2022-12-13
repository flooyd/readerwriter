<script>
	import { fade } from 'svelte/transition';
</script>

<div in:fade class="home">
	<div class="intro">
		<div>Welcome to Read and Write.</div>
		<img src="/writingimage.png" alt="pencil" />
	</div>
	<div class="description">Read and Write is a simple blog site.</div>
	<div class="more">
		<div>Add friends,</div>
		<div>Leave comments</div>
		<div>Suggest edits</div>
		<div>etc.</div>
	</div>
	<button>Go</button>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: 40px;
		justify-content: center;
		height: calc(100% - 33px);
		padding-left: 48px;
		margin-top: -20px;
	}
	.intro {
		font-size: 76px;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: fit-content;
		gap: 20px;
	}
	.intro img {
		height: 152px;
	}
	.description {
		font-size: 48px;
		color: lightcoral;
		font-weight: bold;
		font-family: 'Lobster', cursive;
		margin-top: -36px;
	}

	.more {
		font-size: 31px;
		display: flex;
		gap: 13px;
		flex-direction: column;
	}

	button {
		width: fit-content;
		font-size: 48px;
		padding: 4px 8px;
		background: lightcoral;
		font-family: 'Lobster', cursive;
	}
</style>
