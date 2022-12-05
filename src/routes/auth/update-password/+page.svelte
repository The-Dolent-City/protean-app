<script>
	import Textfield from '$lib/components/Textfield.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import Notification from 'carbon-icons-svelte/lib/Notification.svelte';
	import Password from 'carbon-icons-svelte/lib/Password.svelte';
	import Security from 'carbon-icons-svelte/lib/Security.svelte';

	export let form;
</script>

<svelte:head>
	<title>Protean | Update Password</title>
</svelte:head>

<div class="flex w-full h-full p-6 items-center justify-center">
	<form
		method="POST"
		class="flex flex-col min-w-[12rem] w-[24rem] max-w-[24rem] px-12 overflow-hidden shadow-xl rounded-md border border-base-800 bg-base-900"
	>
		<h1
			class="-mx-12 mb-8 px-12 py-8 border-b border-base-800 text-4xl font-semibold tracking-tight text-left"
		>
			<div class="text-default text-lg font-normal tracking-normal mb-2">Protean</div>
			<div class="text-focus">Set new password</div>
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
		<p class="mb-8">
			<Textfield
				id="password"
				name="password"
				type="password"
				label="Password"
				required
				minlength="6"
			/>
		</p>
		<button
			type="submit"
			class="flex -mx-12 px-12 py-4 gap-3 items-center font-medium text-lg text-focus outline-base-800 outline outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline-base-700 focus:bg-base-800"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-green-600 text-white">
				<Password size={20} />
			</div>
			<span class="text-left">Confirm</span>
		</button>
		<a
			href="/auth"
			class="flex -mx-12 px-12 py-4 gap-3 items-center font-medium text-lg text-focus outline-base-800 outline outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline-base-700 focus:bg-base-800"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-base-600 text-white">
				<Security size={20} />
			</div>
			<span class="text-left">Back to login</span>
		</a>
	</form>
</div>
