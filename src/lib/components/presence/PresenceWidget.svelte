<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { getUser } from '$lib/api';
	import { channelMessages, channelRolls, channelUsers, presence } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import Popover from '$lib/components/surfaces/Popover.svelte';
	import Persona from '$lib/components/persona/Persona.svelte';

	/** Setup presence and realtime */
	onMount(() => {
		setupPresence();
		setupRealtime();
	});

	function setupPresence() {
		if ($user?.id) {
			$presence = supabaseClient.channel('public:users', {
				config: {
					presence: {
						key: $user.id
					}
				}
			});

			$presence.on('presence', { event: 'sync' }, () => {
				// Fetch latest state and users
				const state = $presence.presenceState();
				let users = [];
				Object.values(state).forEach((userArray) => {
					users = users.concat(userArray);
				});
				users = users.map((user) => user.user);

				// Update channel messages based on latest user data
				$channelUsers = users;
				$channelMessages?.forEach((message) => {
					$channelUsers?.forEach((channelUser) => {
						if (message && channelUser && message.author.id === channelUser.id) {
							message.author.username = channelUser.username;
							message.author.nickname = channelUser.nickname;
							message.author.color = channelUser.color;
						}
					});
				});
				$channelMessages = $channelMessages;

				// Update channel rolls based on latest user data
				$channelRolls?.forEach((roll) => {
					$channelUsers?.forEach((channelUser) => {
						if (roll && channelUser && roll.author.id === channelUser.id) {
							roll.author.username = channelUser.username;
							roll.author.nickname = channelUser.nickname;
							roll.author.color = channelUser.color;
						}
					});
				});
				$channelRolls = $channelRolls;
			});

			$presence.subscribe(async (status) => {
				if (status === 'SUBSCRIBED') {
					await $presence.track({
						user: $user
					});
				}
			});
		}
	}

	function setupRealtime() {
		supabaseClient
			.channel(`public:messages`)
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) =>
				onInsertMessage(payload?.new)
			)
			.subscribe();

		supabaseClient
			.channel(`public:rolls`)
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rolls' }, (payload) =>
				onInsertRoll(payload?.new)
			)
			.subscribe();
	}

	async function onInsertMessage(message) {
		if (message && message.channel_id === $page?.data?.channel?.id) {
			let author = await getUser(supabaseClient, message.user_id);
			message.author = author;
			$channelMessages = [...$channelMessages, message];
		}
	}

	async function onInsertRoll(roll) {
		if (roll && $channelRolls && roll.channel_id === $page?.data?.channel?.id) {
			let author = await getUser(supabaseClient, roll.user_id);
			if (author) {
				roll.author = author;
			}
			$channelRolls = [...$channelRolls, roll];
		}
	}

	$: onlineCount = $channelUsers?.length ?? '0';
</script>

{#if $channelUsers && $channelUsers.length > 0}
	<Popover position="right" triggerType="hover">
		<div slot="trigger" class="flex gap-3 items-center">
			<span class="text-sm truncate">{onlineCount} online</span>
			{#if $channelUsers}
				<div class="flex flex-wrap">
					{#each $channelUsers as user}
						<div
							class="w-4 h-4 md:w-6 md:h-6 -mx-1 rounded-full border-2 border-black"
							style:background-color={user?.color}
						/>
					{/each}
				</div>
			{/if}
		</div>
		<div slot="content" class="flex flex-col gap-2">
			{#if $channelUsers}
				{#each $channelUsers as user}
					<div class="flex gap-2 items-center truncate">
						<Persona letters={user?.username?.slice(0, 1)} color={user?.color} size="xs" />
						{user?.nickname}
					</div>
				{/each}
			{:else}
				<!-- else content here -->
			{/if}
		</div>
	</Popover>
{/if}
