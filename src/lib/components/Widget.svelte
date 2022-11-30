<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = '';
	export { className as class };
	export let loading = false;
	export let header;

	$: css = new CssBuilder()
		.addClass('flex flex-col overflow-hidden rounded-md border border-base-800 bg-base-900')
		.addClass('animate-pulse', loading)
		.addClass(className, className)
		.build();
</script>

{#if loading}
	<div tabindex="-1" class={css}>
		<h3 class="flex-none p-3 text-sm text-focus truncate border-b border-base-800">
			{header}
		</h3>
		<slot />
	</div>
{:else}
	<div tabindex="-1" class={css}>
		<h3 class="flex-none p-3 text-sm text-focus truncate border-b border-base-800">
			{header}
		</h3>
		<div class="relative flex-auto min-h-0 overflow-y-auto overscroll-none">
			<slot />
		</div>
	</div>
{/if}
