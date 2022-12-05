<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	export let onkeydown = () => {};
	export let label;
	export let value;
	export let size = 'md';

	$: css = new CssBuilder()
		.addClass(
			'peer appearance-none w-full rounded border border-base-800 text-default cursor-text bg-base-900'
		)
		.addClass('hover:border-base-700 hover:bg-base-800')
		.addClass('focus:border-base-700 focus:outline-none focus:text-focus')
		.addClass('placeholder:italic')
		.addClass('text-xs px-2 py-1.5', size === 'xs')
		.addClass('text-sm px-2 py-1.5', size === 'sm')
		.addClass('text-base px-2 py-1', size === 'md')
		.addClass('text-lg p-2', size === 'lg')
		.build();
</script>

<label class="block relative w-full max-w-full cursor-pointer">
	{#if label}
		<div class="mb-1 text-sm truncate">{label}</div>
	{/if}
	<input bind:value on:keydown={onkeydown} class={css} {...$$restProps} />
	<div
		class="invisible peer-focus:visible transform-none absolute z-10 left-0 bottom-0 w-full h-full border-b rounded-md border-base-400"
	/>
</label>
