<script>
	import { header } from '$lib/stores/header-store';
	import { channel, channelMessages, channelRolls } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import MessageWidget from './MessageWidget.svelte';
	import UserWidget from './UserWidget.svelte';
	import RollWidget from './RollWidget.svelte';

	export let data;

	$header = data.header;
	$channel = data.channel;
	$channelMessages = data.messages;
	$channelRolls = data.rolls;
	$user = data.user;
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
<UserWidget />
