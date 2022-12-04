<script>
	import { supabaseClient } from '$lib/db';
	import { addMessage } from '$lib/api';
	import { channel } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';
	import Textfield from '$lib/components/Textfield.svelte';

	let value;

	async function submitOnEnter(event) {
		if (event.key === 'Enter' && validate()) {
			await addMessage(supabaseClient, value, $channel.id, $user.id);
			value = '';
		}
	}

	function validate() {
		return value;
	}
</script>

<div class="sticky top-0 left-0 right-0 w-full p-3 -my-3 border-b border-base-800 bg-base-900">
	<Textfield
		type="text"
		bind:value
		on:keydown={(e) => submitOnEnter(e)}
		placeholder="Send a message"
		size="sm"
	/>
</div>
