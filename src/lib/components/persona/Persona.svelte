<script>
	import { CssBuilder } from '$lib/builders/css-builder.js';
	import { fade } from 'svelte/transition';

	export let onclick = null;
	export let letters = null;
	export let color = '#27272a';
	export let loading = false;
	export let size = 'md';

	$: css = new CssBuilder()
		.addClass('uppercase')
		.addClass('flex-none flex items-center justify-center rounded-full animate-pulse', loading)
		.addClass('flex-none flex items-center justify-center rounded-full acc-focus', !loading)
		.addClass('w-4 h-4 text-transparent', size === 'xs')
		.addClass('w-6 h-6 text-xs text-focus', size === 'sm')
		.addClass('w-8 h-8 text-base text-focus', size === 'md')
		.addClass('w-10 h-10 text-lg text-focus', size === 'lg')
		.addClass('w-12 h-12 text-lg text-focus', size === 'xl')
		.build();
</script>

{#if loading}
	<div transition:fade|local={{ duration: 500 }} class={css} style:background-color={'#27272a'} />
{:else if onclick}
	<button
		on:click={onclick}
		transition:fade|local={{ duration: 500 }}
		class={css}
		style:background-color={color}
	>
		<span>{letters}</span>
	</button>
{:else}
	<div transition:fade|local={{ duration: 500 }} class={css} style:background-color={color}>
		<span>{letters}</span>
	</div>
{/if}
