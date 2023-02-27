<script>
	import { CssBuilder } from '$lib/builders/css-builder';

	let className;
	export { className as class };
	export let onkeydown = () => {};
	export let label;
	export let value;
	export let size = 'md';

	$: css = new CssBuilder()
		.addClass(
			'peer appearance-none w-full rounded outline outline-1 outline-base-700 text-default cursor-text bg-base-800 resize-none'
		)
		.addClass('focus:outline-2 focus:outline-primary-500 focus:caret-primary-500 focus:text-focus')
		.addClass('placeholder:italic')
		.addClass('text-xs px-2 py-1.5', size === 'xs')
		.addClass('text-sm px-2 py-1.5', size === 'sm')
		.addClass('text-base px-2 py-1', size === 'md')
		.addClass('text-lg p-2', size === 'lg')
		.addClass(className, className)
		.build();

	const keydown = (e) => {
		if (e.keyCode == '13') {
			e.preventDefault();
		}

		onkeydown(e);
	};
</script>

<label class="block relative w-full max-w-full cursor-pointer">
	{#if label}
		<div class="mb-1 text-sm truncate">{label}</div>
	{/if}
	<textarea bind:value on:keydown={keydown} cols="3" class={css} {...$$restProps} />
</label>
