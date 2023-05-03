<script>
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import Persona from '$lib/components/persona/Persona.svelte';
	import AccountPersonaForm from '$lib/components/persona/AccountPersonaForm.svelte';
	import Popover from '$lib/components/surfaces/Popover.svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';

	let open = false;

	function toggleOpen() {
		open = !open;
	}

	function close() {
		open = false;
	}

	async function signout() {
		await supabaseClient.auth.signOut();
		throw redirect(303, '/signin');
	}
</script>

{#if $page?.data?.user}
	<Popover bind:open position="right">
		<Persona
			slot="trigger"
			onclick={toggleOpen}
			letters={$page?.data?.user?.username?.slice(0, 1)}
			color={$page?.data?.user?.color}
		/>
		<svelte:fragment slot="content">
			<div class="-mx-6 mb-4 px-6 pb-4 border-b border-base-800">
				<div>Signed in as</div>
				<div class="font-medium text-focus">{$page?.data?.user?.username}</div>
			</div>
			<AccountPersonaForm onsubmit={close} />
			<div class="-mx-6 mt-4 -mb-4 border-t border-base-800">
				<button
					on:click={signout}
					class="flex w-full px-6 py-4 gap-2 items-center rounded-b-md font-semibold text-focus hover:outline hover:outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline focus:outline-1 focus:outline-base-700 focus:bg-base-800"
				>
					<Logout size={20} class="p-1 rounded-full bg-base-600 text-white" />
					<span>Sign out</span>
				</button>
			</div>
		</svelte:fragment>
	</Popover>
{:else}
	<Persona loading />
{/if}
