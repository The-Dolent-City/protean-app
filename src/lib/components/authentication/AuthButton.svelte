<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let link = null;
	let className = null;
	export let formaction = null;
	export { link as href, className as class };

	$: css = new CssBuilder()
		.addClass('flex px-6 py-2.5 gap-3 items-center justify-center rounded')
		.addClass('font-semibold text-sm text-focus')
		.addClass('text-black bg-white')
		.addClass('acc-focus')
		.addClass(className, className)
		.build();
</script>

{#if link}
	<a href={link} class={css}>
		<slot name="icon" />
		<slot name="text" />
	</a>
{:else}
	<button type="submit" {formaction} class={css}>
		<slot name="icon" />
		<slot name="text" />
	</button>
{/if}
