<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { scrollToBottomAction } from 'svelte-legos';
	import { getRolls, getUser } from '$lib/api';
	import { supabaseClient } from '$lib/db';
	import { channelRolls } from '$lib/stores/channel-store';
	import { widgets } from '$lib/stores/widget-store';
	import Widget from '$lib/components/widgets/Widget.svelte';
	import Roll from '$lib/components/widgets/Roll.svelte';
	import RollInput from '$lib/components/widgets/RollInput.svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';

	/** Variables */
	let loading = true;

	/** Initialization */
	onMount(async () => {
		if ($page.data?.channel?.id && active) {
			await load();
		}
	});

	/** Component methods */
	async function load() {
		loading = true;

		$channelRolls = await getRolls(supabaseClient, $page.data?.channel?.id);

		supabaseClient
			.channel(`public:rolls`)
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rolls' }, (payload) =>
				onInsertRoll(payload.new)
			)
			.subscribe();

		loading = false;
	}

	async function onInsertRoll(roll) {
		if (roll && roll.channel_id === $page?.data?.channel?.id) {
			let author = await getUser(supabaseClient, roll.user_id);
			roll.author = author;
			$channelRolls = [roll, ...$channelRolls];
		}
	}

	$: active = $widgets.find((w) => w === 'roll') === undefined ? false : true;
</script>

<Widget header="Rolls" class="overflow-hidden">
	{#if loading}
		<div class="flex-auto overflow-y-auto [overflow-anchor:auto]">
			<div class="flex-auto flex flex-col-reverse gap-6 py-3 [overflow-anchor:none]">
				{#each Array(16) as _, i}
					<Roll loading />
				{/each}
			</div>
			<pre class="invisible flex-none w-full min-h-[1px] [overflow-anchor:auto]" />
		</div>
		<div class="flex-none w-full p-3 border-b border-base-800 bg-base-900">
			<div
				class="w-full h-[4.3125rem] rounded-lg outline outline-1 outline-base-700 bg-base-800 animate-pulse"
			/>
		</div>
	{:else if $channelRolls}
		{#if $channelRolls.length === 0}
			<div class="grow flex p-4 items-center justify-center">
				<div class="flex flex-col gap-2 items-center">
					<WarningAltFilled size={64} class="block text-amber-500" />
					<h4>No rolls could be loaded</h4>
				</div>
			</div>
			<RollInput />
		{:else}
			<div use:scrollToBottomAction class="flex-auto overflow-y-auto [overflow-anchor:auto]">
				<div class="flex-auto flex flex-col-reverse gap-6 py-3 [overflow-anchor:none]">
					{#each $channelRolls as roll, i (roll?.id)}
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
