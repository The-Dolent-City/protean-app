<script>
	import { supabaseClient } from '$lib/db';
	import { addMessage } from '$lib/api';
	import { channel } from '$lib/stores/channel-store';
	import { user } from '$lib/stores/user-store';

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
	<input
		bind:value
		type="text"
		class="appearance-none w-full px-3 py-2 rounded-lg text-sm border border-base-700 bg-base-900 focus:outline-none focus:border-base-600 focus:text-white"
		placeholder="Send a message"
		on:keydown={(e) => submitOnEnter(e)}
	/>
</div>
