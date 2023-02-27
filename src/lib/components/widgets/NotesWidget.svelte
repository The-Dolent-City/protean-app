<script>
	import { onMount } from 'svelte';
	import { getUser } from '$lib/api';
	import { supabaseClient } from '$lib/db';
	import { channelNotes } from '$lib/stores/channel-store';
	import Note from './Note.svelte';
	import NotesInput from './NotesInput.svelte';
	import Widget from '$lib/components/Widget.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';

	let editing = true;

	$: loading = !Array.isArray($channelNotes);
</script>

<Widget
	header="Notes"
	class="col-span-full sm:col-span-6 lg:col-span-4 row-span-4 overflow-hidden"
	bodyClass="relative overflow-y-auto"
	{loading}
>
	{#if $channelNotes}
		{#if $channelNotes.length === 0}
			<div class="flex-grow flex p-4 items-center justify-center">
				<div class="flex flex-col gap-2 items-center">
					<WarningAltFilled size={32} class="block text-amber-500" />
					<h4>No notes could be loaded</h4>
				</div>
			</div>
		{:else}
			<div class="mt-10 space-y-6">
				{#each $channelNotes as note, i (note.id)}
					<Note
						on:click={() => (editing = note)}
						author={note?.author}
						note={note?.note}
						timestamp={note?.inserted_at}
					/>
				{/each}
				<pre class="w-full min-h-[1px] bg-base-900" />
			</div>
		{/if}
	{:else}
		<div class="relative flex-auto min-h-[32rem]" />
	{/if}
	<div
		class="absolute left-0 right-0 bottom-0 flex items-center justify-center border-t border-base-800"
	>
		{#if editing}
			<div class="flex w-full divide-x divide-base-800">
				<button
					class="flex w-full px-6 py-4 gap-2 items-center font-semibold text-focus outline-base-800 hover:outline hover:outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline focus:outline-1 focus:outline-base-700 focus:bg-base-800"
				>
					<Close size={20} class="p-1 rounded-full bg-red-600 text-white" />
					<span>Clear changes</span>
				</button>
				<button
					class="flex w-full px-6 py-4 gap-2 items-center font-semibold text-focus outline-base-800 hover:outline hover:outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline focus:outline-1 focus:outline-base-700 focus:bg-base-800"
				>
					<Checkmark size={20} class="p-1 rounded-full bg-green-600 text-white" />
					<span>Save changes</span>
				</button>
			</div>
		{:else}
			<!-- else content here -->
		{/if}
	</div>
</Widget>
