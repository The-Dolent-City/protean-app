<script>
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import HeaderBackArrow from '$lib/components/layout/HeaderBackArrow.svelte';
	import HeaderTitle from '$lib/components/layout/HeaderTitle.svelte';
	import HeaderTop from '$lib/components/layout/HeaderTop.svelte';
	import HeaderTopLeft from '$lib/components/layout/HeaderTopLeft.svelte';
	import HeaderTopRight from '$lib/components/layout/HeaderTopRight.svelte';
	import Main from '$lib/components/layout/Main.svelte';
	import Persona from '$lib/components/persona/AccountPersona.svelte';

	export let data;
</script>

<svelte:head>
	<title>Protean | Games</title>
	<meta name="description" content="Select an RPG to play with friends." />
</svelte:head>

<Header>
	<HeaderTop>
		<HeaderTopLeft>
			<HeaderBackArrow href="/" />
			<HeaderTitle>Games</HeaderTitle>
		</HeaderTopLeft>
		<HeaderTopRight>
			{#if $page?.data?.user}
				<Persona />
			{/if}
		</HeaderTopRight>
	</HeaderTop>
</Header>
<Main>
	<div class="flex flex-col max-w-2xl gap-6">
		{#if data?.channels}
			{#each data.channels as channel}
				<div class="">
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
				<hr class="w-full -mx-6 border border-base-800" />
			{/each}
		{:else}
			<h1>Unable to retrieve games</h1>
		{/if}
	</div>
</Main>
