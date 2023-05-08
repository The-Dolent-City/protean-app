<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { channel, channelRolls } from '$lib/stores/channel-store';
	import AlertError from '$lib/components/alerts/AlertError.svelte';
	import DiceRolls from '$lib/components/dice-roller/DiceRolls.svelte';
	import DiceRollerInput from '$lib/components/dice-roller/DiceRollerInput.svelte';
	import SetStoreAsync from '$lib/components/async/SetStoreAsync.svelte';

	$: title = `Protean | ${$page?.data?.header ?? 'Game'}`;

	onMount(() => {
		$channel = $page?.data?.channel;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Roll dice with friends." />
</svelte:head>

<div class="flex-1 flex flex-col max-w-4xl max-h-full gap-3 md:gap-6">
	{#await $page?.data?.streamingRolls?.data}
		<DiceRolls loading />
	{:then data}
		<SetStoreAsync store={channelRolls} {data} />
		<DiceRolls />
	{:catch error}
		<AlertError>Unable to load dice rolls</AlertError>
	{/await}
	<DiceRollerInput />
</div>
