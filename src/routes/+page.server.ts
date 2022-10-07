import { redirect, type Cookies } from '@sveltejs/kit';

export async function load({ url, cookies }: { url: URL; cookies: Cookies }) {
	const logout = url.searchParams.get('logout');

	if (logout) {
		cookies.set('sessionid', '');
	}

	throw redirect(303, '/login');
}
