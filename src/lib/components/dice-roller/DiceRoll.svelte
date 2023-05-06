<script>
	import Time from 'svelte-time';
	import Persona from '$lib/components/persona/Persona.svelte';

	export let loading = false;
	export let starting = true;
	export let author = null;
	export let result = null;
	export let timestamp = null;

	$: authorText = author?.nickname
		? author.nickname
		: author?.username
		? author.username
		: 'Unknown user';

	$: color = author?.color ?? '27272a';
</script>

{#if loading}
	<div
		class="flex w-full gap-3 mt-6 first:mt-0 px-4 items-start overflow-hidden rounded-md text-default"
	>
		<Persona loading />
		<div class="flex-auto flex flex-col min-w-0">
			<h3 class="flex h-6 gap-1 items-baseline truncate">
				<span class="w-16 h-[1rem] rounded-md animate-pulse bg-base-800" />
				<span class="w-10 h-[0.75rem] rounded-md animate-pulse bg-base-800" />
			</h3>
			<p class="inline-block w-64 h-4 rounded-md animate-pulse bg-base-800" />
		</div>
	</div>
{:else if starting}
	<div class="flex w-full gap-3 mt-6 first:mt-0 px-4 items-start overflow-hidden text-default">
		<Persona letters={author?.username?.slice(0, 1)} {color} />
		<div class="flex-auto flex flex-col min-w-0">
			<h3 class="align-baseline truncate">
				<span class="mr-1 text-focus">{authorText}</span>
				<Time relative {timestamp} class="text-xs text-base-500" />
			</h3>
			<p class="text-base-400">{result}</p>
		</div>
	</div>
{:else}
	<div
		class="flex w-full pl-[3.25rem] md:pl-[3.75rem] pr-4 gap-3 items-start overflow-hidden text-default"
	>
		<p class="flex-auto text-base-400">{result}</p>
	</div>
{/if}
