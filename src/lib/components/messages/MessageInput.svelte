<script>
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { addMessage } from '$lib/api';
	import { user } from '$lib/stores/user-store';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';

	let value;
	$: error = null;

	async function submitOnEnter(event) {
		if (event.key === 'Enter' && validate()) {
			await submit();
			value = '';
		}

		return false;
	}

	async function submit() {
		try {
			error = null;
			await addMessage(supabaseClient, value, $page?.data?.channel?.id, $user?.id);
		} catch (e) {
			error = 'Invalid message';
		}
	}

	function validate() {
		return value;
	}
</script>

<div
	class="flex-none flex flex-col gap-2 px-3 py-3 items-center rounded border border-base-800 bg-black"
>
	<input
		bind:value
		on:keydown={submitOnEnter}
		placeholder="Send message"
		class="appearance-none w-full px-3 py-2 rounded bg-base-900 placeholder:text-base-500 focus:text-focus focus:bg-base-800 focus:outline-none"
	/>
	{#if error}
		<div class="flex w-full gap-2 items-start">
			<div class="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
				<Close size={12} />
			</div>
			<p class="grow font-medium text-red-500">{error}</p>
		</div>
	{/if}
</div>
