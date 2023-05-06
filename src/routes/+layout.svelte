<script>
	import '../styles/app.css';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { dev } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import { inject } from '@vercel/analytics';
	import { supabaseClient } from '$lib/db';
	import Container from '$lib/components/layout/Container.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(async (event, session) => {
			console.log(`AuthStateChange:${event}`);
			invalidate('supabase:auth');

			if (event == 'PASSWORD_RECOVERY') {
				throw new redirect(303, '/update-password');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Container>
	<slot />
</Container>
