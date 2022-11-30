<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { useOutsideClick } from '$lib/actions/use-outside-click';
	import { user } from '$lib/stores/user-store';
	import Persona from '$lib/components/Persona.svelte';
	import AccountPersonaForm from './AccountPersonaForm.svelte';

	let open = false;

	function toggleOpen() {
		open = !open;
	}

	function close() {
		open = false;
	}
</script>

{#if $user}
	<div use:useOutsideClick on:clickoutside={close} class="relative">
		<Persona onclick={toggleOpen} letter={$user?.username[0]} color={$user?.color} />
		{#if open}
			<div
				transition:fly={{ duration: 100, x: 0, y: -20, opacity: 0.01 }}
				class="absolute z-20 top-[150%] right-0 px-6 py-4 text-sm rounded-md shadow-2xl border border-base-800 bg-base-900/50 backdrop-blur after:content-[''] after:absolute after:right-3 after:-top-[16px] after:border-8 after:border-transparent after:border-b-base-900 before:content-[''] before:absolute before:right-3 before:-top-[17px] before:border-8 before:border-transparent before:border-b-base-800"
			>
				<AccountPersonaForm onsubmit={close} />
			</div>
		{/if}
	</div>
{:else}
	<Persona loading />
{/if}
