<script>
	import { onMount } from 'svelte';
	import { channelRolls } from '$lib/stores/channel-store.js';
	import { scrollToBottomAction } from 'svelte-legos';
	import DiceRoll from '$lib/components/dice-roller/DiceRoll.svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';

	export let loading = false;
</script>

{#if loading}
	<div
		use:scrollToBottomAction
		class="flex-auto overflow-hidden rounded border border-base-800 bg-black"
	>
		<div class="flex-auto flex flex-col py-3">
			{#each Array(16) as _, i}
				<DiceRoll loading />
			{/each}
		</div>
	</div>
{:else if $channelRolls && $channelRolls.length > 0}
	<div
		use:scrollToBottomAction
		class="flex-auto overflow-y-auto [overflow-anchor:auto] rounded border border-base-800 bg-black"
	>
		<div class="flex-auto flex flex-col py-3 [overflow-anchor:none]">
			{#each $channelRolls as roll, i (roll?.id)}
				{#if i - 1 < 0 || $channelRolls[i - 1].author.id !== roll.author.id}
					<DiceRoll
						author={roll?.author}
						result={roll?.result}
						timestamp={roll?.inserted_at}
						starting={true}
					/>
				{:else}
					<DiceRoll
						author={roll?.author}
						result={roll?.result}
						timestamp={roll?.inserted_at}
						starting={false}
					/>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div
		class="flex-1 flex flex-col max-w-4xl gap-3 p-6 items-center rounded border border-base-800 bg-black"
	>
		<WarningAltFilled size={64} class="text-amber-500" />
		<p class="text-xl font-medium">No rolls found</p>
	</div>
{/if}
