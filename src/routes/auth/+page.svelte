<script>
	export let form;

	console.log('FORM');
	console.log(form);
</script>

<svelte:head>
	<title>Protean | Auth</title>
</svelte:head>

<div class="flex w-full h-full items-center justify-center">
	<form method="POST" action="?/signin" class="flex flex-col max-w-lg p-12 rounded-md bg-black">
		<h1 class="mb-16 text-6xl font-bold tracking-tight text-center text-focus">Authentication</h1>
		{#if form?.error}
			<p class="-mt-8 mb-8 text-lg text-red-600">
				{form.error}
			</p>
		{:else if form?.message}
			<p class="-mt-8 mb-8 text-lg text-default">
				{form.message}
			</p>
		{/if}
		<p class="mb-6">
			<label for="email" class="block mb-1">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				value={form?.email ?? ''}
				class="appearance-none w-full px-3 py-2 rounded-md text-default bg-base-900 focus:text-focus focus:bg-base-800 focus:outline-none mst"
				required
			/>
		</p>
		<p class="mb-12">
			<label for="password" class="block mb-1">Password</label>
			<input
				id="password"
				type="password"
				name="password"
				class="appearance-none w-full px-3 py-2 rounded-md text-default bg-base-900 focus:text-focus focus:bg-base-800 focus:outline-none mst"
				required
			/>
		</p>
		<div>
			<button
				type="submit"
				class="w-full p-4 rounded-md text-base-950 bg-base-100 hover:bg-base-200 mst"
			>
				Sign in
			</button>
			<button
				formaction="?/signup"
				class="w-full p-4 rounded-md text-base-100 hover:underline hover:decoration-2 hover:decoration-base-100 mst"
			>
				Sign up
			</button>
		</div>
	</form>
</div>
