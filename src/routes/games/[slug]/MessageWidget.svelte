<script>
	import { onMount } from 'svelte';
	import { getUser } from '$lib/api';
	import { supabaseClient } from '$lib/db';
	import { channelMessages } from '$lib/stores/channel-store';
	import Message from './Message.svelte';
	import MessageInput from './MessageInput.svelte';
	import Widget from '../../../lib/components/Widget.svelte';

	/** Setup realtime */
	onMount(() => {
		supabaseClient
			.channel(`public:messages`)
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) =>
				onInsertMessage(payload.new)
			)
			.subscribe();
	});

	/** Component methods */
	async function onInsertMessage(message) {
		if (message) {
			let author = await getUser(supabaseClient, message.user_id);
			message.author = author;
			$channelMessages = [message, ...$channelMessages];
		}
	}
</script>

{#if $channelMessages}
	<Widget header="Messages" class="col-span-full sm:col-span-6 row-span-4">
		<MessageInput />
		<div class="mt-10 space-y-6">
			{#each $channelMessages as message, i (message.id)}
				<Message
					author={message?.author}
					message={message?.message}
					timestamp={message?.inserted_at}
				/>
			{/each}
			<pre class="w-full min-h-[1px] bg-base-900" />
		</div>
	</Widget>
{:else}
	<Widget header="Messages" class="col-span-full sm:col-span-6 row-span-4" loading>
		<div class="relative flex-auto min-h-[32rem]" />
	</Widget>
{/if}
