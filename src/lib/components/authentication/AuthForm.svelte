<script>
	import { Close, Notification } from 'carbon-icons-svelte';

	export let method = 'POST';
	export let action;
	export let error;
	export let notification;
</script>

<form
	{method}
	{action}
	class="flex flex-col min-w-[12rem] w-[24rem] max-w-[24rem] overflow-hidden shadow-xl rounded-md border border-base-800 bg-black"
>
	<h1 class="px-12 py-8 border-b border-base-800 text-3xl font-semibold tracking-tight text-left">
		<div class="text-default text-lg font-normal tracking-normal mb-2">Protean</div>
		<div class="text-focus">
			<slot name="title" />
		</div>
	</h1>
	{#if error}
		<div
			class="flex px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
				<Close size={20} />
			</div>
			<p class="mt-0.5">{error}</p>
		</div>
	{:else if notification}
		<div
			class="flex px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-base-600 text-white">
				<Notification size={20} />
			</div>
			<p class="mt-0.5">{notification}</p>
		</div>
	{/if}
	<div class="flex flex-col gap-6 px-12 py-6">
		<slot name="fields" />
	</div>
	<div class="flex flex-col px-12 pb-6">
		<slot name="buttons" />
	</div>
</form>
