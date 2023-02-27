<script>
	import { onMount } from 'svelte';
	import { getUser } from '$lib/api';
	import { supabaseClient } from '$lib/db';
	import { channelRolls } from '$lib/stores/channel-store';
	import Widget from '$lib/components/Widget.svelte';
	import Roll from '$lib/components/widgets/Roll.svelte';
	import RollInput from '$lib/components/widgets/RollInput.svelte';
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
	{loading}
>
	{#if $channelRolls}
		{#if $channelRolls.length === 0}
			<div class="grow flex p-4 items-center justify-center">
				<div class="flex flex-col gap-2 items-center">
					<WarningAltFilled size={32} class="block text-amber-500" />
					<h4>No rolls could be loaded</h4>
				</div>
			</div>
			<RollInput />
		{:else}
			<div class="flex-auto overflow-y-auto [overflow-anchor:auto]">
				<div class="flex-auto flex flex-col-reverse gap-6 py-3 [overflow-anchor:none]">
					{#each $channelRolls as roll, i (roll.id)}
						<Roll author={roll?.author} result={roll?.result} timestamp={roll?.inserted_at} />
					{/each}
				</div>
				<pre class="invisible flex-none w-full min-h-[1px] [overflow-anchor:auto]" />
			</div>
			<RollInput />
		{/if}
	{:else}
		<div class="relative flex-auto min-h-[32rem]" />
	{/if}
</Widget>
