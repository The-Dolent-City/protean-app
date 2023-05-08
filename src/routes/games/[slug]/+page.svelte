<script>
	import { page } from '$app/stores';
	import { channel } from '$lib/stores/channel-store';
	import AlertError from '$lib/components/alerts/AlertError.svelte';
	import SetStoreAsync from '$lib/components/async/SetStoreAsync.svelte';

	$: title = `Protean | ${$page?.data?.header ? $page.data.header : 'Game'}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="description"
		content="View details about an active RPG and navigate to sub pages to play with friends."
	/>
</svelte:head>

<div class="flex-1 max-w-2xl p-12 rounded border border-base-800 bg-black">
	{#await $page?.data?.streamingChannel?.data}
		<div class="w-full h-28 rounded bg-base-900 animate-pulse" />
	{:then data}
		<SetStoreAsync store={channel} {data} />
		{#if $channel?.description}
			<p class="text-lg md:text-xl leading-relaxed">
				{$channel.description}
			</p>
		{/if}
	{:catch error}
		<AlertError>Unexpected error</AlertError>
	{/await}
</div>
