<script>
	import { ArrowLeft } from 'carbon-icons-svelte';

	export let href;
</script>

<a {href} class="p-1.5 rounded-full hover:bg-base-200 hover:text-black mst">
	<ArrowLeft size={20} />
</a>
