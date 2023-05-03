<script>
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { addNote } from '$lib/api';
	import { channel } from '$lib/stores/channel-store';
	import Textarea from '$lib/components/inputs/Textarea.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';

	let value;
	$: error = null;

	async function submitOnEnter(event) {
		if (event.key === 'Enter' && validate()) {
			try {
				await addNote(supabaseClient, value, $channel.id, $page?.data?.user?.id);
			} catch (e) {
				error = 'Invalid note';
			}
			value = '';
		}
	}

	function validate() {
		return value;
	}
</script>

<div class="sticky top-0 left-0 right-0 w-full p-3 -my-3 border-b border-base-800 bg-base-900">
	<Textarea type="text" bind:value onkeydown={submitOnEnter} placeholder="Enter notes" size="sm" />
	{#if error}
		<div class="flex w-full mt-4 gap-2 items-start">
			<div class="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
				<Close size={12} />
			</div>
			<p class="w-full font-medium text-red-500">{error}</p>
		</div>
	{/if}
</div>
