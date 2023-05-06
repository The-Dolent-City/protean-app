<script>
	import { page } from '$app/stores';

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
	{#if $page?.data?.channel?.description}
		<p class="text-xl leading-relaxed">
			{$page.data.channel.description}
		</p>
	{/if}
</div>
