<script>
	import { supabaseClient } from '$lib/db';
	import { addRoll } from '$lib/api';
	import { channel } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import { DiceRoll } from '@dice-roller/rpg-dice-roller';
	import Textfield from '$lib/components/Textfield.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';

	let value;
	$: error = null;

	async function submitOnEnter(event) {
		if (event.key === 'Enter' && validate()) {
			try {
				error = null;
				const roll = new DiceRoll(value);
				await addRoll(supabaseClient, roll, $channel.id, $user.id);
			} catch (e) {
				error = 'Invalid dice roll';
			}
			value = '';
		}
	}

	function validate() {
		return value;
	}
</script>

<div class="sticky top-0 left-0 right-0 w-full p-3 -my-3 border-b border-base-800 bg-base-900">
	<Textfield
		type="text"
		bind:value
		onkeydown={submitOnEnter}
		placeholder="Roll dice, ex: 2d6 + 10"
		size="sm"
	/>
	{#if error}
		<div class="flex w-full mt-4 gap-2 items-start">
			<div class="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
				<Close size={12} />
			</div>
			<p class="w-full font-medium text-red-500">{error}</p>
		</div>
	{/if}
</div>
