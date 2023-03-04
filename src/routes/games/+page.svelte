<script>
	export let data;
</script>

<svelte:head>
	<title>Protean | Games</title>
	<meta name="description" content="Select an RPG to play with friends." />
</svelte:head>

{#if data?.channels}
	{#each data.channels as channel}
		<a
			href={`/games/${channel.slug}?id=${channel.id}`}
			class="col-span-full sm:col-span-6 md:col-span-4 p-6 rounded-md border border-base-800 bg-base-900 hover:border-base-700 hover:bg-base-800 mst"
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
