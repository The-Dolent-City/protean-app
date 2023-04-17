<script>
	import { textareaAutosizeAction } from 'svelte-legos';
	import { CssBuilder } from '$lib/builders/css-builder';

	let className = null;
	export { className as class };
	export let onkeydown = () => {};
	export let value;
	export let size = 'md';

	$: css = new CssBuilder()
		.addClass('peer appearance-none block w-full rounded leading-normal resize-none')
		.addClass('text-focus bg-base-900')
		.addClass('placeholder:text-base-500 focus:outline-none')
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

<textarea bind:value on:keydown={keydown} cols={2} class={css} {...$$restProps} />
