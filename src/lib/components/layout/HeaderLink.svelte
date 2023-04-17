<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let link = null;
	export { link as href };

	$: css = new CssBuilder()
		.addClass('shrink px-2 py-0.5 rounded-lg truncate bg-base-950')
		.addClass('text-base font-medium tracking-tight')
		.addClass('text-default hover:text-focus hover:bg-base-800', link)
		.addClass('text-focus cursor-default', !link)
		.build();
</script>

<a href={link} class={css}>
	<slot />
</a>
