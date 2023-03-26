<script>
	import { CssBuilder } from '$lib/builders/css-builder';
	import { widgets } from '$lib/stores/widget-store';

	export let widget;
	export let title;

	function toggleWidget() {
		if ($widgets?.find((w) => w === widget)) {
			deactivateWidget();
		} else {
			activateWidget();
		}
	}

	function activateWidget() {
		$widgets = [...$widgets, widget];
	}

	function deactivateWidget() {
		$widgets = $widgets.filter((w) => w != widget);
	}

	$: css = new CssBuilder()
		.addClass('group flex p-2 items-center justify-center rounded-lg mst')
		.addClass('text-focus bg-base-800', toggled)
		.addClass('text-less-focus bg-base-950 hover:text-focus hover:bg-base-800', !toggled)
		.build();

	$: toggled = $widgets.find((w) => w === widget) === undefined ? false : true;
</script>

<button on:click={() => toggleWidget(widget)} class={css} {title}>
	<slot />
</button>
