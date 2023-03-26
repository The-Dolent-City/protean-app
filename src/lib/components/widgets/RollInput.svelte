<script>
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';
	import { addRoll } from '$lib/api';
	import { user } from '$lib/stores/user-store';
	import { DiceRoll } from '@dice-roller/rpg-dice-roller';
	import Textarea from '$lib/components/inputs/Textarea.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';

	let value;
	$: error = null;

	async function submitOnEnter(event) {
		if (event.key === 'Enter' && validate()) {
			try {
				error = null;
				const roll = new DiceRoll(value);
				value = '';
				await addRoll(supabaseClient, roll, $page?.data?.channel?.id, $user.id);
			} catch (e) {
				error = 'Invalid dice roll';
			}
		}

		return false;
	}

	function validate() {
		return value;
	}
</script>

<div class="flex-none w-full p-3 border-b border-base-800 bg-base-900">
	<Textarea bind:value onkeydown={submitOnEnter} placeholder="Roll dice, ex: 2d6 + 10" size="sm" />
	{#if error}
		<div class="flex w-full mt-4 gap-2 items-start">
			<div class="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
				<Close size={12} />
			</div>
			<p class="w-full font-medium text-red-500">{error}</p>
		</div>
	{/if}
</div>
