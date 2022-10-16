import { error, json } from '@sveltejs/kit';
import * as api from '$lib/api';

export async function POST({ request }: { request: Request }) {
	let token = request.headers.get('cookie') as string;

	const linkData = await request.json();

	if (linkData.name === '') delete linkData.name;

	if (linkData.hash === '') delete linkData.hash;

	try {
		const response = await api.post('/links', linkData, token);

		if (response.status === 400) {
			const data = await response.json();

			throw error(400, data);
		}

		if (response.status > 204) {
			throw error(500, 'Unable to save the link');
		}

		const data = await response.json();

		return json(data);
	} catch (err: any) {
		console.log('err', err);

		if (err?.status) {
			throw error(err.status, err.body);
		}

		throw error(500, 'Unable to save the link');
	}
}
