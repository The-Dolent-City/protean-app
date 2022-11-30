<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user-store';

	export let data;

	onMount(() => {
		$user = data?.user;
		console.log($user);
	});
</script>

<svelte:head>
	<title>Protean | Games</title>
</svelte:head>

{#if data?.channels}
	{#each data.channels as channel}
		<a
			href={`/games/${channel.slug}?id=${channel.id}`}
			class="col-span-4 h-52 p-6 rounded-md bg-base-900"
		>
			<h2 class="text-xl font-medium text-focus">
				{channel.title}
			</h2>
			<p class="">
				{channel.description}
			</p>
		</a>
	{/each}
{:else}
	<h1>Unable to retrieve games</h1>
{/if}
