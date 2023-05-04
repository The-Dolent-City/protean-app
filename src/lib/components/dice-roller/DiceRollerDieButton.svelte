<script>
	export let number = 6;
	export let onclick;

	$: die = `D${number}`;

	async function click() {
		await onclick(number);
	}
</script>

<button
	on:click={click}
	class="relative flex items-center justify-center font-dice text-3xl text-focus hover:text-white mst"
>
	{die}
	<div
		class="absolute inset-0 flex items-center justify-center font-sans text-lg tracking-tighter font-semibold text-black"
	>
		{number}
	</div>
</button>
