<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = null;
	export { className as class };
	export let onkeydown = () => {};
	export let label;
	export let value = null;
	export let size = 'md';
	export let light = false;

	$: labelCss = new CssBuilder()
		.addClass('block relative w-full max-w-full cursor-pointer')
		.addClass(className, className)
		.build();

	$: inputCss = new CssBuilder()
		.addClass('peer appearance-none w-full rounded text-focus cursor-text')
		.addClass('focus:outline-none focus:caret-base-300')
		.addClass('placeholder:text-base-500')
		.addClass('bg-base-800', light)
		.addClass('bg-base-900', !light)
		.addClass('text-xs px-2 py-1.5', size === 'xs')
		.addClass('text-sm px-2 py-1.5', size === 'sm')
		.addClass('text-base px-2 py-1', size === 'md')
		.addClass('text-lg p-2', size === 'lg')
		.build();
</script>

<label class={labelCss}>
	{#if label}
		<div class="mb-1 text-sm truncate">{label}</div>
	{/if}
	<div class="relative w-full">
		<input bind:value on:keydown={onkeydown} class={inputCss} {...$$restProps} />
	</div>
</label>
