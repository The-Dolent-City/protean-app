import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getChannels, getUser } from '$lib/api';

export const prerender = 'auto';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/auth');
	}
	const channels = await getChannels(supabaseClient);
	const user = await getUser(supabaseClient, session?.user?.id);

	return {
		session: session,
		channels,
		user
	};
};
