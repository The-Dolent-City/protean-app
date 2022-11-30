<script>
	import { header } from '$lib/stores/header-store';
</script>

<header
	class="fixed z-30 left-0 right-0 top-0 flex h-16 gap-8 px-6 py-4 items-center justify-between border-b border-base-800"
>
	<h3 class="text-lg font-medium tracking-tight text-focus">Protean</h3>
	<!-- {#if $header}
		<h1 class="text-4xl font-bold tracking-tight text-focus">
			{$header}
		</h1>
	{/if} -->
	<slot />
</header>
