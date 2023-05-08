import { fail } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	default: async (event) => {
		console.log('resetpassword');
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');

		const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
			redirectTo: event?.url?.origin + '/update-password'
		});

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

		return {
			email,
			message: 'Check your email for your password confirmation link.'
		};
	}
};