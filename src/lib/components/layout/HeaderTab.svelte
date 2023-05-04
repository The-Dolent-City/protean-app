<script>
	import { page } from '$app/stores';
	import { CssBuilder } from '$lib/builders/css-builder';

	export let href;
	export let active = false;

	$: css = new CssBuilder()
		.addClass('group py-3 border-b-2 text-sm font-medium tracking-tight focus:outline-none')
		.addClass('border-base-200 text-focus', active)
		.addClass('border-transparent', !active)
		.build();

	$: active = $page?.url?.pathname === href;
</script>

<a {href} class={css}>
	<span
		class="rounded px-3 py-1.5 group-hover:text-focus group-focus:text-focus group-hover:bg-base-800 group-focus:bg-base-800"
	>
		<slot />
	</span>
</a>
