<script>
	import { page } from '$app/stores';
	import { widgets } from '$lib/stores/widget-store';
	import MessageWidget from '$lib/components/widgets/MessageWidget.svelte';
	import RollWidget from '$lib/components/widgets/RollWidget.svelte';

	export let data;
</script>

<svelte:head>
	<title>Protean | {data?.header ? data.header : 'Game'}</title>
	<meta
		name="description"
		content="Play RPGs in realtime with friends using the widgets provided on this page."
	/>
</svelte:head>

<div
	class="grow flex flex-col lg:flex-row w-full h-full gap-6 p-6 lg:p-8 items-stretch overflow-x-auto"
>
	{#if $page?.data?.channel?.id}
		{#each $widgets as widget}
			{#if widget === 'roll'}
				<RollWidget />
			{:else if widget === 'message'}
				<MessageWidget />
			{:else}
				<!-- else content here -->
			{/if}
		{/each}
	{/if}
</div>
