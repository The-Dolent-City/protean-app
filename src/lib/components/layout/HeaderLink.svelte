<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let link;
	export { link as href };

	$: css = new CssBuilder()
		.addClass('px-2 py-0.5 rounded-full border border-base-950')
		.addClass('text-base font-semibold tracking-tight text-focus')
		.addClass('hover:border-primary-400 hover:text-primary-400 hover:bg-primary-900/25')
		.build();
</script>

<a href={link} class={css}>
	<slot />
</a>
