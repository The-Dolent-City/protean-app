<script>
	import { channelRolls } from '$lib/stores/channel-store.js';
	import { scrollToBottomAction } from 'svelte-legos';
	import AlertWarning from '$lib/components/alerts/AlertWarning.svelte';
	import DiceRoll from '$lib/components/dice-roller/DiceRoll.svelte';

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
	<AlertWarning>No rolls found</AlertWarning>
{/if}
