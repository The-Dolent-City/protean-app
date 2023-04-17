<script>
	import { fade } from 'svelte/transition';
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = '';
	export { className as class };
	export let loading = false;
	export let header;

	$: wrapperCss = new CssBuilder()
		.addClass(
			'flex-1 flex flex-col rounded border border-base-900 bg-gradient-to-b from-base-900 to-base-950'
		)
		.addClass('animate-pulse', loading)
		.addClass(className, className)
		.build();
</script>

<div tabindex="-1" class={wrapperCss}>
	<h3 class="flex-none p-3 text-sm font-medium text-focus truncate border-b border-black">
		{header}
	</h3>
	{#if loading}
		<slot />
	{:else}
		<slot />
	{/if}
</div>
