<script>
	import { header } from '$lib/stores/header-store';
</script>

<header
	class="fixed z-30 left-0 right-0 top-0 flex h-14 gap-8 pl-2 pr-4 items-center justify-between border-b border-base-900"
>
	<slot />
</header>
