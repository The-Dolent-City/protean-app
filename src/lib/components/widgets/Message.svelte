<script>
	import Time from 'svelte-time';

	export let author;
	export let message;
	export let timestamp;

	$: authorText = author?.nickname
		? author.nickname
		: author?.username
		? author.username
		: 'Unknown user';
</script>

<div class="flex w-full px-4 gap-3 items-start overflow-hidden rounded-md text-default">
	<div
		class="flex-none flex w-10 h-10 mt-0.5 items-center justify-center rounded-full"
		style:background-color={author?.color ? author.color : '#27272a'}
	>
		{#if author?.username && author.username?.length > 0}
			<span class="text-focus uppercase">{author.username?.slice(0, 2)}</span>
		{/if}
	</div>
	<div class="flex-auto flex flex-col min-w-0">
		<h3 class="align-baseline truncate">
			<span class="mr-1 text-focus">{authorText}</span>
			<Time relative {timestamp} class="text-xs text-less-focus" />
		</h3>
		<p class="text-default">{message}</p>
	</div>
</div>
