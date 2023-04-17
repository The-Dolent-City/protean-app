<script>
	import { fly } from 'svelte/transition';
	import { useOutsideClick } from '$lib/actions/use-outside-click';
	import { CssBuilder } from '$lib/builders/css-builder';

	export let open;
	export let position = 'left';
	export let triggerType = 'click';

	$: css = new CssBuilder()
		.addClass(
			'absolute z-20 top-[160%] px-6 py-4 text-sm rounded-md shadow-2xl border border-base-700 bg-base-950'
		)
		.addClass(
			"after:content-[''] after:absolute after:-top-[24px] after:border-[12px] after:border-transparent after:border-b-base-950"
		)
		.addClass(
			"before:content-[''] before:absolute before:-top-[25px] before:border-[12px] before:border-transparent before:border-b-base-700"
		)
		.addClass('-left-2 after:left-3 before:left-3', position === 'left')
		.addClass('-right-2 after:right-3 before:right-3', position === 'right')
		.build();

	function onClickOutside() {
		if (triggerType === 'click') {
			open = false;
		}
	}

	function onMouseEnter() {
		if (triggerType === 'hover') {
			open = true;
		}
	}

	function onMouseLeave() {
		if (triggerType === 'hover') {
			open = false;
		}
	}
</script>

<div
	use:useOutsideClick
	on:clickoutside={onClickOutside}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	class="relative"
>
	<slot name="trigger" />
	{#if open}
		<div transition:fly|local={{ duration: 100, x: 0, y: -20, opacity: 0.01 }} class={css}>
			<slot name="content" />
		</div>
	{/if}
</div>
