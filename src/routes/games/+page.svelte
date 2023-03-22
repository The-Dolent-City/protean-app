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
		<span>/</span>
		<HeaderLink>games</HeaderLink>
	</div>
	{#if $user}
		<Persona />
	{/if}
</Header>
<Main>
	<div class="flex flex-col gap-4 p-6">
		{#if data?.channels}
			{#each data.channels as channel}
				<div class="">
					<a
						href={`/games/${channel.slug}`}
						class="block text-xl font-semibold text-primary-400 decoration-2 decoration-primary-400 hover:underline mst"
					>
						{channel?.title}
					</a>
					<p class="mt-2">
						{channel.description}
					</p>
				</div>
				<hr class="border border-base-800" />
			{/each}
		{:else}
			<h1>Unable to retrieve games</h1>
		{/if}
	</div>
</Main>
