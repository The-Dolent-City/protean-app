<script>
	import Email from 'carbon-icons-svelte/lib/Email.svelte';
	import Security from 'carbon-icons-svelte/lib/Security.svelte';
	import AuthForm from '$lib/components/authentication/AuthForm.svelte';
	import AuthButton from '$lib/components/authentication/AuthButton.svelte';
	import AuthButtonIcon from '$lib/components/authentication/AuthButtonIcon.svelte';
	import Textfield from '$lib/components/inputs/Textfield.svelte';

	export let form;
</script>

<svelte:head>
	<title>Protean | Reset Password</title>
	<meta name="description" content="Send a Protean password reset request to your account email." />
</svelte:head>

<div class="flex w-full h-full p-6 items-center justify-center">
	<AuthForm error={form?.error} notification={form?.message}>
		<svelte:fragment slot="title">Reset password</svelte:fragment>
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
		</svelte:fragment>
		<svelte:fragment slot="buttons">
			<AuthButton>
				<AuthButtonIcon slot="icon" class="bg-blue-600">
					<Email size={20} />
				</AuthButtonIcon>
				<svelte:fragment slot="text">Send password reset link</svelte:fragment>
			</AuthButton>
			<AuthButton href="/auth">
				<AuthButtonIcon slot="icon" class="bg-base-600">
					<Security size={20} />
				</AuthButtonIcon>
				<svelte:fragment slot="text">Back to login</svelte:fragment>
			</AuthButton>
		</svelte:fragment>
	</AuthForm>
</div>
