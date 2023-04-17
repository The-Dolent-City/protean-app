<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { header } from '$lib/stores/header-store';
	import { widgets } from '$lib/stores/widget-store';
	import { user } from '$lib/stores/user-store';
	import Header from '$lib/components/layout/Header.svelte';
	import HeaderLink from '$lib/components/layout/HeaderLink.svelte';
	import Main from '$lib/components/layout/Main.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Persona from '$lib/components/persona/AccountPersona.svelte';
	import MessageWidget from '$lib/components/widgets/MessageWidget.svelte';
	import RollWidget from '$lib/components/widgets/RollWidget.svelte';
	import UserWidget from '$lib/components/widgets/UserWidget.svelte';

	export let data;

	onMount(() => {
		$header = data?.header;
		$user = data?.user;
	});
</script>

<svelte:head>
	<title>Protean | {data?.header ? data.header : 'Game'}</title>
	<meta
		name="description"
		content="Play RPGs in realtime with friends using the widgets provided on this page."
	/>
</svelte:head>

<Header>
	<div class="shrink flex gap-1 items-center">
		<HeaderLink href={`/`}>protean</HeaderLink>
		<span class="text-base-700 cursor-default">/</span>
		<HeaderLink href={`/games`}>games</HeaderLink>
		<span class="text-base-700 cursor-default">/</span>
		{#if $user}
			<HeaderLink>
				{$page?.data?.channel?.slug}
			</HeaderLink>
		{:else}
			<HeaderLink>
				<div class="w-20 h-[1.5rem] rounded-lg animate-pulse bg-base-800" />
			</HeaderLink>
		{/if}
	</div>
	{#if $user}
		<Persona />
	{/if}
</Header>
<Main>
	<Sidebar />
	<div
		class="grow flex flex-col lg:flex-row w-full h-full gap-6 p-6 lg:p-8 items-stretch overflow-x-auto"
	>
		{#if $page?.data?.channel?.id}
			{#each $widgets as widget}
				{#if widget === 'roll'}
					<RollWidget />
				{:else if widget === 'message'}
					<MessageWidget />
				{:else if widget === 'user'}
					<UserWidget />
				{:else}
					<!-- else content here -->
				{/if}
			{/each}
		{/if}
	</div>
</Main>
