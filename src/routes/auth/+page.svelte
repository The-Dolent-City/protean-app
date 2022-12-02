<script>
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import Email from 'carbon-icons-svelte/lib/Email.svelte';
	import Login from 'carbon-icons-svelte/lib/Login.svelte';
	import Notification from 'carbon-icons-svelte/lib/Notification.svelte';

	export let form;
</script>

<svelte:head>
	<title>Protean | Auth</title>
</svelte:head>

<div class="flex w-full h-full items-center justify-center">
	<form
		method="POST"
		action="?/signin"
		class="flex flex-col w-[24rem] px-12 overflow-auto rounded-md border border-base-800 bg-base-900"
	>
		<h1
			class="-mx-12 mb-8 px-12 py-8 border-b border-base-800 text-4xl font-semibold tracking-tight text-left"
		>
			<div class="text-default text-xl font-normal tracking-normal mb-2">Protean-App</div>
			<div class="text-focus">Authentication</div>
		</h1>
		{#if form?.error}
			<div
				class="flex -mx-12 -mt-8 mb-8 px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1"
			>
				<div class="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
					<Close size={20} />
				</div>
				<p>{form.error}</p>
			</div>
		{:else if form?.message}
			<div
				class="flex -mx-12 -mt-8 mb-8 px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1"
			>
				<div class="flex p-1.5 items-center justify-center rounded-full bg-base-600 text-white">
					<Notification size={20} />
				</div>
				<p>{form.message}</p>
			</div>
		{/if}
		<p class="mb-6">
			<label for="email" class="block mb-2 leading-none">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				value={form?.email ?? ''}
				class="appearance-none w-full px-3 py-2 rounded-md text-default border border-base-700 bg-base-900 focus:text-focus focus:border-base-600 focus:outline-none mst"
				required
			/>
		</p>
		<p class="mb-8">
			<label for="password" class="block mb-2 leading-none">Password</label>
			<input
				id="password"
				type="password"
				name="password"
				class="appearance-none w-full px-3 py-2 rounded-md text-default border border-base-700 bg-base-900 focus:text-focus focus:border-base-600 focus:outline-none mst"
				required
			/>
		</p>
		<button
			type="submit"
			class="flex -mx-12 px-12 py-4 gap-3 items-center font-medium text-lg text-focus outline-base-800 outline outline-1 hover:outline-base-700 hover:bg-base-800"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-green-600 text-white">
				<Login size={20} />
			</div>
			<span>Sign in</span>
		</button>
		<button
			formaction="?/signup"
			class="flex -mx-12 px-12 py-4 gap-3 items-center font-medium text-lg text-focus rounded-b-md outline-base-800 outline outline-1 hover:outline-base-700 hover:bg-base-800"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-blue-600 text-white">
				<Email size={20} />
			</div>
			<span>Sign up</span>
		</button>
		<!-- <div>
			<button
				type="submit"
				class="w-full p-4 rounded-md text-base-950 bg-base-100 hover:bg-base-300 mst"
			>
				Sign in
			</button>
			<button
				formaction="?/signup"
				class="w-full p-4 rounded-md text-base-100 hover:underline hover:decoration-2 hover:decoration-base-100 mst"
			>
				Sign up
			</button>
		</div> -->
	</form>
</div>
