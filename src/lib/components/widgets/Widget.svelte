<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = '';
	export { className as class };
	export let loading = false;
	export let header;

	$: wrapperCss = new CssBuilder()
		.addClass('flex flex-col rounded-lg border border-base-800 bg-base-900')
		.addClass('animate-pulse', loading)
		.addClass(className, className)
		.build();
</script>

<div tabindex="-1" class={wrapperCss}>
	<h3
		class="flex-none p-3 text-xl tracking-tight font-semibold text-focus truncate border-b border-base-800"
	>
		{header}
	</h3>
	{#if loading}
		<slot />
	{:else}
		<slot />
	{/if}
</div>
