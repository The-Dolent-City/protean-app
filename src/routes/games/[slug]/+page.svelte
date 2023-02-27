<script>
	import { onMount } from 'svelte';
	import { header } from '$lib/stores/header-store';
	import { channel, channelMessages, channelNotes, channelRolls } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import MessageWidget from '$lib/components/widgets/MessageWidget.svelte';
	import NotesWidget from '$lib/components/widgets/NotesWidget.svelte';
	import RollWidget from '$lib/components/widgets/RollWidget.svelte';
	import UserWidget from '$lib/components/widgets/UserWidget.svelte';

	export let data;

	onMount(() => {
		$header = data.header;
		$channel = data.channel;
		$channelMessages = data.messages;
		$channelNotes = data.notes;
		$channelRolls = data.rolls;
		$user = data.user;
	});
</script>

<svelte:head>
	<title>Protean | {$header}</title>
	<meta
		name="description"
		content="Play RPGs in realtime with friends using the widgets provided on this page."
	/>
</svelte:head>

<MessageWidget />
<RollWidget />
<!-- <NotesWidget /> -->

{#if $user}
	<UserWidget />
{/if}
