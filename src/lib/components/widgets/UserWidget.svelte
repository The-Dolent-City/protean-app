<script>
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
	import { channelMessages, channelRolls, channelUsers, presence } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import Widget from '$lib/components/widgets/Widget.svelte';
	import UserPersona from '$lib/components/widgets/UserPersona.svelte';
	import Persona from '../persona/Persona.svelte';

	/** Setup presence */
	onMount(() => {
		if ($user?.id) {
			$presence = supabaseClient.channel('public:users', {
				config: {
					presence: {
						key: $user.id
					}
				}
			});

			$presence.on('presence', { event: 'sync' }, () => {
				const state = $presence.presenceState();
				let users = [];
				Object.values(state).forEach((userArray) => {
					users = users.concat(userArray);
				});
				users = users.map((user) => user.user);
				$channelUsers = users;
				$channelMessages?.forEach((message) => {
					$channelUsers?.forEach((channelUser) => {
						if (message.author.id === channelUser.id) {
							message.author.username = channelUser.username;
							message.author.nickname = channelUser.nickname;
							message.author.color = channelUser.color;
						}
					});
				});
				$channelMessages = $channelMessages;
				$channelRolls?.forEach((roll) => {
					$channelUsers?.forEach((channelUser) => {
						if (roll.author.id === channelUser.id) {
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
	});
</script>

<Widget header="Active users" class="overflow-hidden">
	{#if $user && $channelUsers}
		<div class="flex flex-wrap w-full min-h-[4rem] gap-3 p-3">
			{#each $channelUsers as user}
				<div class="flex gap-3 pb-2 items-start">
					<Persona letters={user?.username?.slice(0, 1)} color={user?.color} />
					<div class="flex flex-col">
						<h3 class="text-focus">
							{user?.nickname}
						</h3>
						<h4 class="text-sm">
							{user?.username}
						</h4>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="relative flex-auto min-h-[4rem]" />
	{/if}
</Widget>
