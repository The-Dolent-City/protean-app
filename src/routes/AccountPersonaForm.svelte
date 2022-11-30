<script>
	import { supabaseClient } from '$lib/db';
	import { updateUser } from '$lib/api';
	import { channelMessages, channelUsers, presence } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';
	import { onMount } from 'svelte';

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

	async function signout() {
		await supabaseClient.auth.signOut();
		throw redirect(303, '/');
	}

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

<form on:submit|preventDefault={submit} class="flex flex-col gap-6">
	<label>
		<div class="mb-1 text-sm">Nickname</div>
		<input
			type="text"
			bind:value={formNickname}
			class="appearance-none px-1.5 py-0.5 rounded border border-base-700 text-default bg-base-800 focus:outline-none focus:text-focus focus:border-base-600"
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
						class="appearance-none w-8 h-8 rounded-md checked:outline checked:outline-2 checked:outline-offset-1 checked:outline-white"
						style:background-color={color}
					/>
				</label>
			{/each}
		</div>
	</div>
	{#if changesMade}
		<div class="flex w-full justify-end">
			<button
				type="submit"
				class="flex px-2 py-1 gap-1 items-center rounded-md border text-xs text-focus border-base-700 bg-base-800"
			>
				<Checkmark size={16} />
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
