<script>
	import { CssBuilder } from '$lib/builders/css-builder';
	import { widgets } from '$lib/stores/widget-store';

	export let widget;
	export let title;

	let toggled = false;

	function toggleWidget() {
		if ($widgets?.find((w) => w === widget)) {
			deactivateWidget();
			toggled = false;
		} else {
			activateWidget();
			toggled = true;
		}
	}

	function activateWidget() {
		$widgets = [...$widgets, widget];
	}

	function deactivateWidget() {
		$widgets = $widgets.filter((w) => w != widget);
	}

	$: css = new CssBuilder()
		.addClass('group flex p-2 items-center justify-center rounded-full border mst')
		.addClass('border-primary-400 text-primary-400 bg-primary-900/25', toggled)
		.addClass('hover:border-primary-300 text-primary-300 hover:bg-primary-900/50', toggled)
		.addClass('border-base-950 bg-base-950', !toggled)
		.addClass('hover:text-primary-400 hover:bg-primary-900/25', !toggled)
		.build();
</script>

<button on:click={() => toggleWidget(widget)} class={css} {title}>
	<slot />
</button>
