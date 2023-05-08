<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { channel, channelMessages } from '$lib/stores/channel-store';
	import AlertError from '$lib/components/alerts/AlertError.svelte';
	import Messages from '$lib/components/messages/Messages.svelte';
	import MessageInput from '$lib/components/messages/MessageInput.svelte';
	import SetStoreAsync from '$lib/components/async/SetStoreAsync.svelte';

	$: title = `Protean | ${$page?.data?.header ?? 'Game'}`;

	onMount(() => {
		$channel = $page?.data?.channel;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Send messages to your friends." />
</svelte:head>

<div class="flex-1 flex flex-col max-w-4xl max-h-full gap-3 md:gap-6">
	{#await $page?.data?.streamingMessages?.data}
		<Messages loading />
	{:then data}
		<SetStoreAsync store={channelMessages} {data} />
		<Messages />
	{:catch error}
		<AlertError>Unable to load messages</AlertError>
	{/await}
	<MessageInput />
</div>
