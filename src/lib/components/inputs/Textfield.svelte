<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className;
	export { className as class };
	export let onkeydown = () => {};
	export let label;
	export let value;
	export let size = 'md';

	$: labelCss = new CssBuilder()
		.addClass('block relative w-full max-w-full cursor-pointer')
		.addClass(className, className)
		.build();

	$: inputCss = new CssBuilder()
		.addClass(
			'peer appearance-none w-full rounded outline outline-1 outline-base-700 text-default cursor-text bg-inherit'
		)
		.addClass('focus:outline-2 focus:outline-primary-500 focus:caret-primary-500 focus:text-focus')
		.addClass('placeholder:italic')
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
		<!-- <div
			class="invisible peer-focus:visible transform-none absolute z-10 left-0 bottom-0 w-full h-full border-b rounded-md border-base-400"
		/> -->
	</div>
</label>
