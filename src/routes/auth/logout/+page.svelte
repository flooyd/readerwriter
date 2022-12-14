<script>
	import { onMount } from 'svelte';

	let form = null;

	$: form ? form.submit() : null;
</script>

<form method="POST" action="?/logout" bind:this={form} />
