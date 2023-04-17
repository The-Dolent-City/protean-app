<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { scrollToBottomAction } from 'svelte-legos';
	import { getMessages, getUser } from '$lib/api';
	import { supabaseClient } from '$lib/db';
	import { channelMessages } from '$lib/stores/channel-store';
	import { widgets } from '$lib/stores/widget-store';
	import Widget from '$lib/components/widgets/Widget.svelte';
	import Message from '$lib/components/widgets/Message.svelte';
	import MessageInput from '$lib/components/widgets/MessageInput.svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';

	/** Variables */
	let loading = true;

	/** Initialization */
	onMount(async () => {
		if ($page.data?.channel?.id && active) {
			await load();

			supabaseClient
				.channel(`public:messages`)
				.on(
					'postgres_changes',
					{ event: 'INSERT', schema: 'public', table: 'messages' },
					(payload) => onInsertMessage(payload.new)
				)
				.subscribe();
		}
	});

	/** Component methods */
	async function load() {
		loading = true;

		$channelMessages = await getMessages(supabaseClient, $page.data?.channel?.id);

		loading = false;
	}

	async function onInsertMessage(message) {
		if (message && message.channel_id === $page?.data?.channel?.id) {
			let author = await getUser(supabaseClient, message.user_id);
			message.author = author;
			$channelMessages = [message, ...$channelMessages];
		}
	}

	$: active = $widgets.find((w) => w === 'message') === undefined ? false : true;
</script>

<Widget header="Messages" class="overflow-hidden">
	{#if loading}
		<div class="flex-auto overflow-y-auto [overflow-anchor:auto]" style:colorScheme="dark">
			<div class="flex-auto flex flex-col-reverse gap-6 py-3 [overflow-anchor:none]">
				{#each Array(16) as _, i}
					<Message loading />
				{/each}
			</div>
			<pre class="invisible flex-none w-full min-h-[1px] [overflow-anchor:auto]" />
		</div>
		<div class="flex-none w-full p-3">
			<div class="w-full h-[3.375rem] rounded-lg bg-base-900 animate-pulse" />
		</div>
	{:else if $channelMessages}
		{#if $channelMessages.length === 0}
			<div class="grow flex p-4 items-center justify-center">
				<div class="flex flex-col gap-2 items-center">
					<WarningAltFilled size={64} class="block text-amber-500" />
					<h4>No messages could be loaded</h4>
				</div>
			</div>
			<MessageInput />
		{:else}
			<div
				use:scrollToBottomAction
				class="flex-auto overflow-y-auto [overflow-anchor:auto]"
				style:colorScheme="dark"
			>
				<div class="flex-auto flex flex-col-reverse gap-6 py-3 [overflow-anchor:none]">
					{#each $channelMessages as message, i (message?.id)}
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
