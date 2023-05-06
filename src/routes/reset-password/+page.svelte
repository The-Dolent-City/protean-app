<script>
	import AuthForm from '$lib/components/authentication/AuthForm.svelte';
	import AuthButton from '$lib/components/authentication/AuthButton.svelte';
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
				<svelte:fragment slot="text">Send link</svelte:fragment>
			</AuthButton>
			<hr class="my-6 border-t border-base-800" />
			<div class="flex gap-1 items-center text-sm">
				<p>Mistake?</p>
				<a
					href="/signin"
					class="block text-center rounded text-primary-500 hover:underline focus:underline focus:outline-none"
				>
					Back to sign in
				</a>
			</div>
		</svelte:fragment>
	</AuthForm>
</div>
