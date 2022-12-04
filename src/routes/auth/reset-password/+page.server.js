import { invalid, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	resetpassword: async (event) => {
		console.log('resetpassword');
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');

		const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
			redirectTo: event?.url?.origin + event?.url?.pathname
		});

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

		return {
			email,
			message: 'Check your email for your password confirmation link.'
		};
	},

	updatepassword: async (event) => {
		console.log('updatepassword');
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const password = formData.get('password');

		const { error } = await supabaseClient.auth.updateUser({ password: password });

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

		throw redirect(303, '/auth');
	}
};
