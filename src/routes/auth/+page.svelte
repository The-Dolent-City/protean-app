<script>
	import Textfield from '$lib/components/Textfield.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import Email from 'carbon-icons-svelte/lib/Email.svelte';
	import Login from 'carbon-icons-svelte/lib/Login.svelte';
	import Notification from 'carbon-icons-svelte/lib/Notification.svelte';
	import Password from 'carbon-icons-svelte/lib/Password.svelte';

	export let form;
</script>

<svelte:head>
	<title>Protean | Auth</title>
	<meta
		name="description"
		content="Login, signup, or change your password for the Protean web app."
	/>
</svelte:head>

<div class="flex w-full h-full p-6 items-center justify-center">
	<form
		method="POST"
		action="?/signin"
		class="flex flex-col min-w-[12rem] w-[24rem] max-w-[24rem] px-12 overflow-hidden shadow-xl rounded-md border border-base-800 bg-base-900"
	>
		<h1
			class="-mx-12 mb-8 px-12 py-8 border-b border-base-800 text-4xl font-semibold tracking-tight text-left"
		>
			<div class="text-default text-lg font-normal tracking-normal mb-2">Protean</div>
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
		<Textfield
			id="email"
			name="email"
			type="email"
			label="Email"
			class="mb-6"
			value={form?.email ?? ''}
			required
		/>
		<Textfield
			id="password"
			name="password"
			type="password"
			label="Password"
			class="mb-8"
			required
			minlength="6"
		/>
		<button
			type="submit"
			class="flex -mx-12 px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline-base-700 focus:bg-base-800"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-green-600 text-white">
				<Login size={20} />
			</div>
			<span class="text-left">Sign in</span>
		</button>
		<button
			formaction="?/signup"
			class="flex -mx-12 px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline-base-700 focus:bg-base-800"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-blue-600 text-white">
				<Email size={20} />
			</div>
			<span class="text-left">Sign up</span>
		</button>
		<a
			href="/auth/reset-password"
			class="flex -mx-12 px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1 hover:outline-base-700 hover:bg-base-800 focus:outline-base-700 focus:bg-base-800"
		>
			<div class="flex p-1.5 items-center justify-center rounded-full bg-base-600 text-white">
				<Password size={20} />
			</div>
			<span class="text-left">Reset password</span>
		</a>
	</form>
</div>
