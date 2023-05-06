<script>
	import { channelMessages } from '$lib/stores/channel-store.js';
	import { scrollToBottomAction } from 'svelte-legos';
	import AlertWarning from '$lib/components/alerts/AlertWarning.svelte';
	import Message from '$lib/components/messages/Message.svelte';

	export let loading = false;
</script>

{#if loading}
	<div
		use:scrollToBottomAction
		class="flex-auto overflow-hidden rounded border border-base-800 bg-black"
	>
		<div class="flex-auto flex flex-col py-3">
			{#each Array(16) as _, i}
				<Message loading />
			{/each}
		</div>
	</div>
{:else if $channelMessages && $channelMessages.length > 0}
	<div
		use:scrollToBottomAction
		class="flex-auto overflow-y-auto [overflow-anchor:auto] rounded border border-base-800 bg-black"
	>
		<div class="flex-auto flex flex-col py-3 [overflow-anchor:none]">
			{#each $channelMessages as message, i (message?.id)}
				{#if i - 1 < 0 || $channelMessages[i - 1].author.id !== message.author.id}
					<Message
						author={message?.author}
						message={message?.message}
						timestamp={message?.inserted_at}
						starting={true}
					/>
				{:else}
					<Message
						author={message?.author}
						message={message?.message}
						timestamp={message?.inserted_at}
						starting={false}
					/>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<AlertWarning>No messages found</AlertWarning>
{/if}
