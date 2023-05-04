import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getRolls } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/signin');
	}

	const { channel } = await event?.parent();
	const rolls = await getRolls(supabaseClient, channel?.id);

	return {
		session,
		rolls
	};
};
