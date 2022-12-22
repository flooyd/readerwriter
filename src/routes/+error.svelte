<script>
	import { page } from '$app/stores';
</script>

<div>{$page.error.message}</div>

<style>
	div {
		margin-top: 20px;
		margin-left: 20px;
	}
</style>
