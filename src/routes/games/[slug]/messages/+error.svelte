<script>
	import { page } from '$app/stores';
	import AlertError from '$lib/components/alerts/AlertError.svelte';

	$: title = `Protean | ${$page?.data?.header ?? 'Game'}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Send messages to your friends." />
</svelte:head>

<div class="flex-1 flex flex-col max-w-4xl max-h-full gap-3 md:gap-6">
	<AlertError>Unexpected error occurred</AlertError>
</div>
