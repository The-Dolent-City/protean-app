import { invalid, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	signin: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			console.error(error);
			if (error instanceof AuthApiError && error.status[0] === 4) {
				return invalid(400, {
					error: error.message,
					email
				});
			}
			return invalid(500, {
				error: error.message,
				email
			});
		}

		throw redirect(303, '/games');
	},

	signup: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		const res = await supabaseClient.auth.signUp({ email, password });
		const user = res.data?.user;
		const session = res.data?.session;
		const error = res.error;

		if (error) {
			console.error(error);
			if (error instanceof AuthApiError && error.status[0] === 4) {
				return invalid(400, {
					error: error.message,
					email
				});
			}
			return invalid(500, {
				error: error.message,
				email
			});
		}

		// Needs email confirmation
		if (user && !session) {
			return {
				status: 200,
				message: 'Please check your email for a confirmation email.'
			};
		}

		throw redirect(303, '/games');
	}
};
