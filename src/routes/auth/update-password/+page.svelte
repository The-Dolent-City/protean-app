<script>
	import Password from 'carbon-icons-svelte/lib/Password.svelte';
	import Security from 'carbon-icons-svelte/lib/Security.svelte';
	import AuthForm from '$lib/components/authentication/AuthForm.svelte';
	import AuthButton from '$lib/components/authentication/AuthButton.svelte';
	import AuthButtonIcon from '$lib/components/authentication/AuthButtonIcon.svelte';
	import Textfield from '$lib/components/inputs/Textfield.svelte';

	export let form;
</script>

<svelte:head>
	<title>Protean | Update Password</title>
	<meta name="description" content="Change your Protean app password to the new one you provide." />
</svelte:head>

<div class="flex w-full h-full p-6 items-center justify-center">
	<AuthForm error={form?.error} notification={form?.message}>
		<svelte:fragment slot="title">Update password</svelte:fragment>
		<svelte:fragment slot="fields">
			<Textfield
				id="password"
				name="password"
				type="password"
				label="Password"
				light
				required
				minlength="6"
			/>
		</svelte:fragment>
		<svelte:fragment slot="buttons">
			<AuthButton>
				<AuthButtonIcon slot="icon" class="bg-green-600">
					<Password size={20} />
				</AuthButtonIcon>
				<svelte:fragment slot="text">Confirm</svelte:fragment>
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
