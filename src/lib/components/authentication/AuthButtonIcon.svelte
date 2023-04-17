<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = null;
	export { className as class };

	$: css = new CssBuilder()
		.addClass('flex p-1.5 items-center justify-center rounded-full text-white')
		.addClass(className, className)
		.build();
</script>

<div class={css}>
	<slot />
</div>
