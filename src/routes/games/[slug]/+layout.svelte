<script>
	import { page } from '$app/stores';
	import { user } from '$lib/stores/user-store';
	import Header from '$lib/components/layout/Header.svelte';
	import HeaderBackArrow from '$lib/components/layout/HeaderBackArrow.svelte';
	import HeaderBottom from '$lib/components/layout/HeaderBottom.svelte';
	import HeaderTab from '$lib/components/layout/HeaderTab.svelte';
	import HeaderTitle from '$lib/components/layout/HeaderTitle.svelte';
	import HeaderTop from '$lib/components/layout/HeaderTop.svelte';
	import HeaderTopLeft from '$lib/components/layout/HeaderTopLeft.svelte';
	import HeaderTopRight from '$lib/components/layout/HeaderTopRight.svelte';
	import Main from '$lib/components/layout/Main.svelte';
	import AccountPersona from '$lib/components/persona/AccountPersona.svelte';
	import PresenceWidget from '$lib/components/widgets/presence/PresenceWidget.svelte';
	import SetStoreAsync from '$lib/components/async/SetStoreAsync.svelte';

	export let data;

	$: headerTitle = $page?.data?.channel?.title ? $page.data.channel.title : 'Game';
	$: gameHref = `/games/${$page?.data?.channel?.slug}`;
	$: diceRollerHref = `/games/${$page?.data?.channel?.slug}/dice-roller`;
	$: messagesHref = `/games/${$page?.data?.channel?.slug}/messages`;
</script>

<svelte:head>
	<title>Protean | {data?.header ? data.header : 'Game'}</title>
	<meta
		name="description"
		content="Play RPGs in realtime with friends using the widgets provided on this page."
	/>
</svelte:head>

<Header>
	<HeaderTop>
		<HeaderTopLeft>
			<HeaderBackArrow href="/games" />
			<HeaderTitle>
				{headerTitle}
			</HeaderTitle>
		</HeaderTopLeft>
		<HeaderTopRight>
			{#await $page?.data?.streamingUser?.data}
				<AccountPersona loading />
			{:then data}
				<SetStoreAsync store={user} {data} />
				<PresenceWidget />
				<AccountPersona />
			{:catch error}
				<AccountPersona />
			{/await}
		</HeaderTopRight>
	</HeaderTop>
	<HeaderBottom>
		<HeaderTab href={gameHref}>Game</HeaderTab>
		<HeaderTab href={diceRollerHref}>Dice roller</HeaderTab>
		<HeaderTab href={messagesHref}>Messages</HeaderTab>
	</HeaderBottom>
</Header>
<Main>
	<slot />
</Main>
