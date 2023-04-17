<script>
	let link = null;
	export { link as href };

	export let formaction = null;
</script>

{#if link}
	<a
		href={link}
		class="flex px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-900 bg-transparent outline outline-1 hover:outline-base-700 hover:bg-base-900 focus:outline-base-700 focus:bg-base-900"
	>
		<slot name="icon" />
		<span class="mt-0.5 text-left">
			<slot name="text" />
		</span>
	</a>
{:else}
	<button
		type="submit"
		{formaction}
		class="flex px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-900 bg-transparent outline outline-1 hover:outline-base-700 hover:bg-base-900 focus:outline-base-700 focus:bg-base-900"
	>
		<slot name="icon" />
		<span class="mt-0.5 text-left">
			<slot name="text" />
		</span>
	</button>
{/if}
