import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { getChannel, getMessages, getRolls, getUser } from '$lib/api';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const channelId = event.url.searchParams.get('id');
	const channel = await getChannel(supabaseClient, channelId);
	const messages = await getMessages(supabaseClient, channelId);
	const rolls = await getRolls(supabaseClient, channelId);
	const user = await getUser(supabaseClient, session?.user?.id);

	return {
		header: event.params.slug,
		session,
		channel,
		messages,
		rolls,
		user
	};
};
