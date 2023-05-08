<script>
	import Textfield from '$lib/components/inputs/Textfield.svelte';
	import Email from 'carbon-icons-svelte/lib/Email.svelte';
	import Login from 'carbon-icons-svelte/lib/Login.svelte';
	import Password from 'carbon-icons-svelte/lib/Password.svelte';
	import AuthForm from '$lib/components/authentication/AuthForm.svelte';
	import AuthButton from '$lib/components/authentication/AuthButton.svelte';
	import AuthButtonIcon from '$lib/components/authentication/AuthButtonIcon.svelte';

	export let form;
</script>

<svelte:head>
	<title>Protean | Sign in</title>
	<meta name="description" content="Sign in or change your password for the Protean web app." />
</svelte:head>

<div class="flex w-full h-full p-6 items-center justify-center bg-base-950">
	<AuthForm error={form?.error} notification={form?.message}>
		<svelte:fragment slot="title">Sign in</svelte:fragment>
		<svelte:fragment slot="fields">
			<Textfield
				id="email"
				name="email"
				type="email"
				label="Email"
				value={form?.email ?? ''}
				required
				light
			/>
			<div class="">
				<Textfield
					id="password"
					name="password"
					type="password"
					label="Password"
					required
					light
					minlength="6"
				/>
				<a
					href="/reset-password"
					class="rounded text-xs hover:underline hover:text-primary-500 focus:underline focus:text-primary-500 focus:outline-none"
					>Forgot your password?</a
				>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="buttons">
			<AuthButton>
				<svelte:fragment slot="text">Continue</svelte:fragment>
			</AuthButton>
			<hr class="my-6 border-t border-base-800" />
			<div class="flex gap-1 items-center text-sm">
				<p>No account?</p>
				<a
					href="/signup"
					class="block text-center rounded text-primary-500 hover:underline focus:underline focus:outline-none"
				>
					Sign up
				</a>
			</div>
		</svelte:fragment>
	</AuthForm>
</div>
