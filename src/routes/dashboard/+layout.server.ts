import { validadeUserSession } from '$lib/shared/auth';

export async function load({ request }) {
	let token = request.headers.get('cookie');

	if (!token) {
		return {};
	}

	const user = await validadeUserSession(token);

	if (!user) {
		return {};
	}

	return {
		user,
		token
	};
}
