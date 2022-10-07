import { json } from '@sveltejs/kit';
import * as api from '$lib/api';

export async function POST({ request }: { request: Request }) {
	let token = request.headers.get('cookie') as string;

	const linkData = await request.json();

	if (linkData.name === '') delete linkData.name;

	if (linkData.hash === '') delete linkData.hash;

	console.log(token, 'linkData');

	try {
		const response = await api.post('/links', linkData, token);

		console.log(response.status, 'oi');

		if (response.status > 200) {
			const res = await response.text();
			console.log(res);
			return json({ success: false });
		}

		const data = await response.json();

		return json(data);
	} catch (err) {
		console.log(err);

		return json({ teste: true });
	}
}
