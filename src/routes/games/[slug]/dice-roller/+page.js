import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getRolls } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/signin');
	}

	const { streamingChannel } = await event?.parent();
	const channel = await streamingChannel.data;

	return {
		session,
		channel,
		streamingRolls: {
			data: getRolls(supabaseClient, channel?.id)
		}
	};
};
