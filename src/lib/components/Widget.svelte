<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = '';
	export { className as class };
	export let bodyClass = '';
	export let loading = false;
	export let header;

	$: wrapperCss = new CssBuilder()
		.addClass('flex flex-col rounded-md border border-base-800 bg-base-900')
		.addClass('animate-pulse', loading)
		.addClass(className, className)
		.build();

	$: bodyCss = new CssBuilder()
		.addClass('flex-auto min-h-0 overscroll-none')
		.addClass(bodyClass, bodyClass)
		.build();
</script>

<div tabindex="-1" class={wrapperCss}>
	<h3 class="flex-none p-3 text-sm text-focus truncate border-b border-base-800">
		{header}
	</h3>
	{#if loading}
		<slot />
	{:else}
		<div tabindex="-1" class={bodyCss}>
			<slot />
		</div>
	{/if}
</div>
