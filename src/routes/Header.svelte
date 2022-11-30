<script>
	import { header } from '$lib/stores/header-store';
</script>

<header
	class="fixed z-30 left-0 right-0 top-0 h-24 flex gap-8 p-6 items-center justify-between border-b border-base-800"
>
	<div class="">
		<h3 class="text-lg font-medium tracking-tight text-focus">Protean</h3>
		<p class="text-sm">A roleplaying app</p>
	</div>
	<!-- {#if $header}
		<h1 class="text-4xl font-bold tracking-tight text-focus">
			{$header}
		</h1>
	{/if} -->
	<slot />
</header>
