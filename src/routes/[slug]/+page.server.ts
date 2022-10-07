import { redirect, type Cookies } from '@sveltejs/kit';
import * as api from '$lib/api';

export async function load({ params, request }: { params: any; request: Request }) {
	let token = request.headers.get('cookie') as string;

	const { slug } = params;

	const response = await api.get(`/links/${slug}/view`, token);

	if (response.status === 200) {
		const data = await response.json();

		throw redirect(303, data.link.url);
	}

	throw redirect(303, '/');
}
