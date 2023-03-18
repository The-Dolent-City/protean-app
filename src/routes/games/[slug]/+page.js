import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { getChannel, getUser } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/auth');
	}

	const channel = await getChannel(supabaseClient, event.params.slug);
	const user = await getUser(supabaseClient, session?.user?.id);

	console.log(event.params.slug);

	return {
		header: event.params.slug,
		channel,
		user
	};
};
