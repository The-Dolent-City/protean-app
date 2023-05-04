<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = '';
	export { className as class };
	export let loading = false;

	$: wrapperCss = new CssBuilder()
		.addClass('flex-1 flex flex-col max-w-4xl max-h-full rounded border border-base-800 bg-black')
		.addClass('animate-pulse', loading)
		.addClass(className, className)
		.build();
</script>

<div tabindex="-1" class={wrapperCss}>
	<slot />
</div>
