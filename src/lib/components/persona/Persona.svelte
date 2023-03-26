<script>
	import { fade } from 'svelte/transition';

	export let onclick = null;
	export let letters = null;
	export let color = '#27272a';
	export let loading = false;
</script>

{#if loading}
	<div
		transition:fade|local={{ duration: 500 }}
		class="flex-none flex w-10 h-10 items-center justify-center rounded-full animate-pulse"
		style:background-color={'#27272a'}
	/>
{:else if onclick}
	<button
		on:click={onclick}
		transition:fade|local={{ duration: 500 }}
		class="flex-none flex w-10 h-10 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-100"
		style:background-color={color}
	>
		<span class="text-focus uppercase">{letters}</span>
	</button>
{:else}
	<div
		transition:fade|local={{ duration: 500 }}
		class="flex-none flex w-10 h-10 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-100"
		style:background-color={color}
	>
		<span class="text-focus uppercase">{letters}</span>
	</div>
{/if}
