<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user-store';
	import Header from '$lib/components/layout/Header.svelte';
	import HeaderLink from '$lib/components/layout/HeaderLink.svelte';
	import Main from '$lib/components/layout/Main.svelte';
	import Persona from '$lib/components/persona/AccountPersona.svelte';

	export let data;

	onMount(() => {
		$user = data?.user;
	});
</script>

<svelte:head>
	<title>Protean | Games</title>
	<meta name="description" content="Select an RPG to play with friends." />
</svelte:head>

<Header>
	<div class="flex gap-1 items-center">
		<HeaderLink href={`/`}>protean</HeaderLink>
		<span class="text-base-700 cursor-default">/</span>
		<HeaderLink>games</HeaderLink>
	</div>
	{#if $user}
		<Persona />
	{/if}
</Header>
<Main>
	<div class="flex flex-col w-full gap-4 p-6">
		{#if data?.channels}
			{#each data.channels as channel}
				<div class="max-w-xl">
					<a
						href={`/games/${channel.slug}`}
						class="inline text-xl font-semibold text-focus decoration-2 decoration-base-300 hover:underline mst"
					>
						{channel?.title}
					</a>
					<p class="mt-2">
						{channel.description}
					</p>
				</div>
				<hr class="w-full border border-base-800" />
			{/each}
		{:else}
			<h1>Unable to retrieve games</h1>
		{/if}
	</div>
</Main>
