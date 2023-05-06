<script>
	import { onMount } from 'svelte';

	export let store;
	export let data;

	onMount(() => {
		if (store) {
			store.set(data);
			console.log(data);
		}
	});
</script>
