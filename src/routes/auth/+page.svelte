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
	<title>Protean | Auth</title>
	<meta
		name="description"
		content="Login, signup, or change your password for the Protean web app."
	/>
</svelte:head>

<div class="flex w-full h-full p-6 items-center justify-center">
	<AuthForm action="?/signin" error={form?.error} notification={form?.message}>
		<svelte:fragment slot="title">Authentication</svelte:fragment>
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
			<Textfield
				id="password"
				name="password"
				type="password"
				label="Password"
				required
				light
				minlength="6"
			/>
		</svelte:fragment>
		<svelte:fragment slot="buttons">
			<AuthButton>
				<AuthButtonIcon slot="icon" class="bg-green-600">
					<Login size={20} />
				</AuthButtonIcon>
				<svelte:fragment slot="text">Sign in</svelte:fragment>
			</AuthButton>
			<AuthButton formaction="?/signup">
				<AuthButtonIcon slot="icon" class="bg-blue-600">
					<Email size={20} />
				</AuthButtonIcon>
				<svelte:fragment slot="text">Sign up</svelte:fragment>
			</AuthButton>
			<AuthButton href="/auth/reset-password">
				<AuthButtonIcon slot="icon" class="bg-base-600">
					<Password size={20} />
				</AuthButtonIcon>
				<svelte:fragment slot="text">Reset password</svelte:fragment>
			</AuthButton>
		</svelte:fragment>
	</AuthForm>
</div>
