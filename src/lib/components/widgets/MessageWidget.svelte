<script>
	import { onMount } from 'svelte';
	import { getUser } from '$lib/api';
	import { supabaseClient } from '$lib/db';
	import { channelMessages } from '$lib/stores/channel-store';
	import Widget from '$lib/components/Widget.svelte';
	import Message from '$lib/components/widgets/Message.svelte';
	import MessageInput from '$lib/components/widgets/MessageInput.svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';

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

	$: loading = !Array.isArray($channelMessages);
</script>

<Widget
	header="Messages"
	class="col-span-full sm:col-span-6 lg:col-span-4 row-span-4 overflow-hidden"
	{loading}
>
	{#if $channelMessages}
		{#if $channelMessages.length === 0}
			<div class="grow flex p-4 items-center justify-center">
				<div class="flex flex-col gap-2 items-center">
					<WarningAltFilled size={32} class="block text-amber-500" />
					<h4>No messages could be loaded</h4>
				</div>
			</div>
			<MessageInput />
		{:else}
			<div class="flex-auto overflow-y-auto [overflow-anchor:auto]">
				<div class="flex-auto flex flex-col-reverse gap-6 py-3 [overflow-anchor:none]">
					{#each $channelMessages as message, i (message.id)}
						<Message
							author={message?.author}
							message={message?.message}
							timestamp={message?.inserted_at}
						/>
					{/each}
				</div>
				<pre class="invisible flex-none w-full min-h-[1px] [overflow-anchor:auto]" />
			</div>
			<MessageInput />
		{/if}
	{:else}
		<div class="relative flex-auto min-h-[32rem]" />
	{/if}
</Widget>
