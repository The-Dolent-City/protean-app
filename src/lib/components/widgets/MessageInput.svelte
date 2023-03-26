<script>
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { addMessage } from '$lib/api';
	import { user } from '$lib/stores/user-store';
	import Textarea from '$lib/components/inputs/Textarea.svelte';

	let value;

	async function submitOnEnter(event) {
		if (event.key === 'Enter' && validate()) {
			await addMessage(supabaseClient, value, $page?.data?.channel?.id, $user.id);
			value = '';
		}
	}

	function validate() {
		return value;
	}
</script>

<div class="flex-none w-full p-3 border-b border-base-800 bg-base-900">
	<Textarea bind:value onkeydown={submitOnEnter} placeholder="Send a message" size="sm" />
</div>
