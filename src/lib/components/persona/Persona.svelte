<script>
	import { CssBuilder } from '$lib/builders/css-builder.js';
	import { Error } from 'carbon-icons-svelte';
	import { fade } from 'svelte/transition';

	export let onclick = null;
	export let letters = null;
	export let color = '#27272a';
	export let size = 'md';
	export let loading = false;
	export let errored = false;

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

	$: errorSize =
		size === 'xs'
			? 16
			: size === 'sm'
			? 24
			: size === 'md'
			? 32
			: size === 'lg'
			? 40
			: size === 'xl'
			? 48
			: 16;
</script>

{#if loading}
	<div transition:fade|local={{ duration: 500 }} class={css} style:background-color={'#27272a'} />
{:else if errored}
	<Error size={errorSize} class="text-red-600" title="User account error" />
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
