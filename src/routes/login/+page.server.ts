import { invalid, redirect, type Actions } from '@sveltejs/kit';
import * as api from '$lib/api';
import { validadeUserSession } from '$lib/shared/auth';

export async function load({ request }) {
	let token = request.headers.get('cookie');
	token = token?.split('=')[1];

	if (!token) {
		return;
	}

	const user = await validadeUserSession(token);

	if (user) {
		throw redirect(303, '/dashboard');
	}

	return;
}

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const response = await api.post(`auth/signin`, {
			email,
			password
		});

		if (response.status === 200) {
			const userData = await response.json();

			cookies.set('sessionid', userData.token);

			throw redirect(303, 'dashboard');
		}

		const errorData = await response.json();

		let formatedMessage = '';

		if (errorData?.errors?.detail) {
			switch (errorData.errors.detail) {
				case 'Unauthorized':
					formatedMessage = 'E-mail or password invalid!';
					break;

				default:
					formatedMessage = 'Try again later!';
					break;
			}
		}

		return invalid(403, { message: formatedMessage });
	},
	register: async (event) => {
		// TODO register the user
	}
};
