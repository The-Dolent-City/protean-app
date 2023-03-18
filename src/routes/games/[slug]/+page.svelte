<script>
	import { onMount } from 'svelte';
	import { header } from '$lib/stores/header-store';
	import { channel, channelMessages, channelNotes, channelRolls } from '$lib/stores/channel-store';
	import { widgets } from '$lib/stores/widget-store';
	import { user } from '$lib/stores/user-store';
	import Header from '$lib/components/layout/Header.svelte';
	import HeaderLink from '$lib/components/layout/HeaderLink.svelte';
	import Main from '$lib/components/layout/Main.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Persona from '$lib/components/persona/AccountPersona.svelte';
	import RollWidget from '$lib/components/widgets/RollWidget.svelte';

	export let data;

	onMount(() => {
		$header = data?.header;
		$channel = data?.channel;
		$user = data?.user;
	});
</script>

<svelte:head>
	<title>Protean | {$header}</title>
	<meta
		name="description"
		content="Play RPGs in realtime with friends using the widgets provided on this page."
	/>
</svelte:head>

<Header>
	<div class="flex flex-wrap gap-1 items-center">
		<HeaderLink href={`/`}>Protean</HeaderLink>
		<span class="text-base-600">/</span>
		<HeaderLink href={`/games`}>Games</HeaderLink>
		<span class="text-base-600">/</span>
		{#if $user}
			<HeaderLink href={`/games/${$channel?.slug}?id=${$channel?.id}`}>
				{$channel?.slug}
			</HeaderLink>
		{:else}
			<HeaderLink>
				<div class="w-20 h-[1.875rem] rounded-full animate-pulse bg-base-800" />
			</HeaderLink>
		{/if}
	</div>
	{#if $user}
		<Persona />
	{/if}
</Header>
<Main>
	<Sidebar />
	<div class="grow grid grid-cols-2 w-full h-full gap-6 p-4 md:p-8 lg:p-12 items-stretch">
		{#if $channel}
			{#each $widgets as widget}
				{#if widget === 'roll'}
					<RollWidget />
				{:else if widget === 'message'}
					<!-- else if content here -->
				{:else}
					<!-- else content here -->
				{/if}
			{/each}
		{:else}
			<!-- else content here -->
		{/if}
	</div>
</Main>
