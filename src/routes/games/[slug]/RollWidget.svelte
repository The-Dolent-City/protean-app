<script>
	import { onMount } from 'svelte';
	import { getUser } from '$lib/api';
	import { supabaseClient } from '$lib/db';
	import { channelRolls } from '$lib/stores/channel-store';
	import Roll from './Roll.svelte';
	import RollInput from './RollInput.svelte';
	import Widget from '$lib/components/Widget.svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';

	/** Setup realtime */
	onMount(() => {
		supabaseClient
			.channel(`public:rolls`)
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rolls' }, (payload) =>
				onInsertRoll(payload.new)
			)
			.subscribe();
	});

	/** Component methods */
	async function onInsertRoll(roll) {
		if (roll) {
			let author = await getUser(supabaseClient, roll.user_id);
			roll.author = author;
			$channelRolls = [roll, ...$channelRolls];
		}
	}

	$: loading = !Array.isArray($channelRolls);
</script>

<Widget
	header="Rolls"
	class="col-span-full sm:col-span-6 lg:col-span-4 row-span-4 overflow-hidden"
	bodyClass="relative overflow-y-auto"
	{loading}
>
	{#if $channelRolls}
		{#if $channelRolls.length === 0}
			<RollInput />
			<div class="absolute left-0 right-0 top-10 bottom-0 flex p-4 items-center justify-center">
				<div class="flex flex-col gap-2 items-center">
					<WarningAltFilled size={32} class="block text-amber-500" />
					<h4>No rolls could be loaded</h4>
				</div>
			</div>
		{:else}
			<RollInput />
			<div class="mt-10 space-y-6">
				{#each $channelRolls as roll, i (roll.id)}
					<Roll author={roll?.author} result={roll?.result} timestamp={roll?.inserted_at} />
				{/each}
				<pre class="w-full min-h-[1px] bg-base-900" />
			</div>
		{/if}
	{:else}
		<div class="relative flex-auto min-h-[32rem]" />
	{/if}
</Widget>
