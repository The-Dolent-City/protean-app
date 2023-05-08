import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getChannel } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/signin');
	}

	return {
		session,
		header: event.params.slug,
		streamingChannel: {
			data: getChannel(supabaseClient, event.params.slug)
		}
	};
};
