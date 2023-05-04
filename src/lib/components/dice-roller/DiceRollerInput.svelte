<script>
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { addRoll } from '$lib/api';
	import { DiceRoll } from '@dice-roller/rpg-dice-roller';
	import DiceRollerDieButton from '$lib/components/dice-roller/DiceRollerDieButton.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';

	let value;
	$: error = null;

	async function rollDie(die) {
		if (die) {
			await submit(die);
		}
	}

	async function submitOnEnter(event) {
		if (event.key === 'Enter' && value) {
			await submit(value);
		}

		return false;
	}

	async function submit(v) {
		try {
			error = null;
			const roll = new DiceRoll(v);
			value = '';
			await addRoll(supabaseClient, roll, $page?.data?.channel?.id, $page?.data?.user?.id);
		} catch (e) {
			error = 'Invalid dice roll';
		}
	}
</script>

<div class="flex-none flex gap-4 px-3 py-3 items-center rounded border border-base-800 bg-black">
	<div class="grow">
		<input
			bind:value
			on:keydown={submitOnEnter}
			placeholder="Roll dice"
			class="appearance-none w-full px-3 py-2 rounded bg-base-900 placeholder:text-base-500 focus:text-focus focus:bg-base-800 focus:outline-none"
		/>
		{#if error}
			<div class="flex w-full mt-2 gap-2 items-start">
				<div class="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
					<Close size={12} />
				</div>
				<p class="grow font-medium text-red-500">{error}</p>
			</div>
		{/if}
	</div>
	<div class="flex-none w-px h-10 rounded bg-base-800" />
	<div class="flex flex-wrap gap-4">
		<DiceRollerDieButton onclick={rollDie} number={4} />
		<DiceRollerDieButton onclick={rollDie} number={6} />
		<DiceRollerDieButton onclick={rollDie} number={8} />
		<DiceRollerDieButton onclick={rollDie} number={10} />
		<DiceRollerDieButton onclick={rollDie} number={12} />
		<DiceRollerDieButton onclick={rollDie} number={20} />
	</div>
</div>
