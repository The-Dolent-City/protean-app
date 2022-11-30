<script>
	import { onMount } from 'svelte';
	import { header } from '$lib/stores/header-store';
	import { channel, channelMessages } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import MessageWidget from './MessageWidget.svelte';
	import UserWidget from './UserWidget.svelte';

	export let data;

	$header = data.header;
	$channel = data.channel;
	$channelMessages = data.messages;
	$user = data.user;
</script>

<MessageWidget />
<UserWidget />
