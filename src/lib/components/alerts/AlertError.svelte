<script>
	import WarningHexFilled from 'carbon-icons-svelte/lib/WarningHexFilled.svelte';
</script>

<div
	class="flex-1 flex flex-col max-w-4xl gap-3 p-6 items-center rounded border border-base-800 bg-black"
>
	<WarningHexFilled size={64} class="text-red-500" />
	<p class="max-w-sm text-xl font-medium">
		<slot />
	</p>
</div>
