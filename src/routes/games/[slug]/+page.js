import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { getChannel, getRolls, getUser } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/auth');
	}

	const [channel, user] = await Promise.all([
		await getChannel(supabaseClient, event.params.slug),
		await getUser(supabaseClient, session?.user?.id)
	]);

	return {
		header: event.params.slug,
		channel,
		user
	};
};
