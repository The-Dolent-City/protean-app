import { fail, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	default: async (event) => {
		console.log('signin');
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			console.error(error);
			if (error instanceof AuthApiError && error.status[0] === 4) {
				return fail(400, {
					error: error.message,
					email
				});
			}
			return fail(500, {
				error: error.message,
				email
			});
		}

		throw redirect(303, '/games');
	}
};
