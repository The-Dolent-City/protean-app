<script>
	import { page } from '$app/stores';
	import { user } from '$lib/stores/user-store';
	import AlertError from '$lib/components/alerts/AlertError.svelte';
	import AlertWarning from '$lib/components/alerts/AlertWarning.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import HeaderBackArrow from '$lib/components/layout/HeaderBackArrow.svelte';
	import HeaderTitle from '$lib/components/layout/HeaderTitle.svelte';
	import HeaderTop from '$lib/components/layout/HeaderTop.svelte';
	import HeaderTopLeft from '$lib/components/layout/HeaderTopLeft.svelte';
	import HeaderTopRight from '$lib/components/layout/HeaderTopRight.svelte';
	import Main from '$lib/components/layout/Main.svelte';
	import AccountPersona from '$lib/components/persona/AccountPersona.svelte';
	import SetStoreAsync from '$lib/components/async/SetStoreAsync.svelte';
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
			{#await $page?.data?.streamingUser?.data}
				<AccountPersona loading />
			{:then data}
				<SetStoreAsync store={user} {data} />
				<AccountPersona />
			{:catch error}
				<AccountPersona />
			{/await}
		</HeaderTopRight>
	</HeaderTop>
</Header>
<Main>
	<div class="flex flex-col max-w-2xl gap-6">
		{#await $page?.data?.streamingChannels?.data}
			{#each Array(4) as _, i}
				<div class="w-2xl">
					<div class="w-40 h-6 rounded bg-base-900 animate-pulse" />
					<p class="w-full h-20 mt-2 rounded bg-base-900 animate-pulse" />
				</div>
				<hr class="-mx-6 border border-base-800" />
			{/each}
		{:then channels}
			{#if channels}
				{#each channels as channel}
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
					<hr class="-mx-6 border border-base-800" />
				{/each}
			{:else}
				<AlertWarning>Unable to retrieve games</AlertWarning>
			{/if}
		{:catch error}
			<AlertError>Unable to retrieve games</AlertError>
		{/await}
	</div>
</Main>
