<script>
	// import Time from 'svelte-time';

	export let author;
	export let note;
	export let timestamp;

	$: authorText = author?.nickname
		? author.nickname
		: author?.username
		? author.username
		: 'Unknown user';
</script>

<button class="flex flex-col w-full gap-1 px-4 items-start">
	<h3 class="align-baseline truncate">
		<span class="mr-2">{authorText}</span>
		<!-- <Time relative {timestamp} class="text-xs text-default" /> -->
	</h3>
	<p class="text-focus line-clamp-3">{note}</p>
</button>
