<script>
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
	import { updateUser } from '$lib/api';
	import { channelMessages, channelUsers, presence } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';

	export let onsubmit;

	let formNickname;
	let formColor;
	const colors = [
		'#b91c1c',
		'#ea580c',
		'#fbbf24',
		'#15803d',
		'#0f766e',
		'#0284c7',
		'#1d4ed8',
		'#6d28d9',
		'#a21caf',
		'#be185d'
	];
	let error;

	onMount(() => {
		formNickname = $user?.nickname;
		formColor = $user?.color ? $user.color : '#27272a';
	});

	function valid() {
		return formNickname && formColor;
	}

	async function submit() {
		if (changesMade && valid()) {
			try {
				await updateUser(supabaseClient, $user?.id, formNickname, formColor);
				$channelMessages.forEach((message) => {
					if (message.author.id === $user?.id) {
						message.author.nickname = formNickname;
						message.author.color = formColor;
					}
				});
				$channelMessages = $channelMessages;
				$channelUsers.forEach((channelUser) => {
					if (channelUser?.id === $user?.id) {
						channelUser.nickname = formNickname;
						channelUser.color = formColor;
					}
				});
				$channelUsers = $channelUsers;
				$user.nickname = formNickname;
				$user.color = formColor;
				await $presence.track({
					user: $user
				});
			} catch (e) {
				error = e;
			}

			if (onsubmit) {
				onsubmit();
			}
		}
	}

	$: changesMade = formNickname != $user?.nickname || formColor != $user?.color;
</script>

<form on:submit|preventDefault={submit} class="flex flex-col">
	<div class="flex flex-col w-full gap-3">
		<label>
			<div class="mb-1 text-sm">Nickname</div>
			<input
				type="text"
				bind:value={formNickname}
				class="appearance-none px-1.5 py-1 rounded border border-base-700 text-default bg-base-900 focus:outline-none focus:text-focus focus:border-base-600"
			/>
		</label>
		<div>
			<div class="mb-2 text-sm">Color</div>
			<div class="flex flex-wrap gap-2 place-content-evenly">
				{#each colors as color}
					<label>
						<div class="sr-only">{color}</div>
						<input
							type="radio"
							bind:group={formColor}
							name="colors"
							value={color}
							class="appearance-none w-8 h-8 rounded-md checked:outline checked:outline-2 checked:outline-offset-2 checked:outline-white"
							style:background-color={color}
						/>
					</label>
				{/each}
			</div>
		</div>
	</div>
	{#if changesMade}
		<div class="flex -mx-6 mt-4 -mb-4 border-t border-base-800">
			<button
				type="submit"
				class="flex w-full px-6 py-4 gap-2 items-center font-semibold text-focus outline-base-800 hover:outline hover:outline-1 hover:outline-base-700 hover:bg-base-800"
			>
				<Checkmark size={20} class="p-1 rounded-full bg-green-600 text-white" />
				<span>Save changes</span>
			</button>
		</div>
	{/if}
	{#if error}
		<p class="font-medium text-red-600">
			{error}
		</p>
	{/if}
</form>
