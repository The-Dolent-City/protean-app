<script>
	import { scrollToBottomAction } from 'svelte-legos';
	import { page } from '$app/stores';
	import DiceRollerInput from '$lib/components/dice-roller/DiceRollerInput.svelte';
	import Roll from '$lib/components/widgets/Roll.svelte';

	$: title = `Protean | ${$page?.data?.header ? $page.data.header : 'Game'}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Roll dice with friends." />
</svelte:head>

{#if $page?.data?.rolls}
	<div class="flex-1 flex flex-col max-w-4xl max-h-full gap-3 md:gap-6">
		<div
			use:scrollToBottomAction
			class="flex-auto overflow-y-auto [overflow-anchor:auto] rounded border border-base-800 bg-black"
		>
			<div class="flex-auto flex flex-col-reverse gap-6 py-3 [overflow-anchor:none]">
				{#each $page.data.rolls as roll, i (roll?.id)}
					<Roll author={roll?.author} result={roll?.result} timestamp={roll?.inserted_at} />
				{/each}
			</div>
			<pre class="invisible flex-none w-full min-h-[1px] [overflow-anchor:auto]" />
		</div>
		<DiceRollerInput />
	</div>
	<!-- {#each $widgets as widget}
		{#if widget === 'roll'}
			<RollWidget />
		{:else if widget === 'message'}
			<MessageWidget />
		{:else}
		
		{/if}
	{/each} -->
{/if}
