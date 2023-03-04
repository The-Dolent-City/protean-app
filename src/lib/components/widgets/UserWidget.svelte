<script>
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
	import { channelMessages, channelRolls, channelUsers, presence } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import Widget from '$lib/components/Widget.svelte';
	import UserPersona from '$lib/components/widgets/UserPersona.svelte';

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

{#if $user && $channelUsers}
	<Widget
		header="Active users"
		class="col-span-full sm:col-span-6 lg:col-span-4 2xl:col-span-4 row-span-1"
	>
		<div class="flex flex-wrap w-full min-h-[4rem] p-3 gap-3">
			{#each $channelUsers as user}
				<UserPersona {user} />
			{/each}
		</div>
	</Widget>
{:else}
	<Widget
		header="Active users"
		class="col-span-full sm:col-span-6 lg:col-span-4 2xl:col-span-4 row-span-1"
		loading
	>
		<div class="relative flex-auto min-h-[4rem]" />
	</Widget>
{/if}
