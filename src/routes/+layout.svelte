<script>
	import '../styles/app.css';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import Container from './Container.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(async (event, session) => {
			console.log(`AuthStateChange:${event}`);
			invalidate('supabase:auth');

			if (event == 'PASSWORD_RECOVERY') {
				throw new redirect(303, '/auth/update-password');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Container>
	<slot />
</Container>
