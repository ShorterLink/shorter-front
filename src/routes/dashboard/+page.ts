import * as api from '$lib/api';
import type { Parent } from '$lib/types';

export async function load({ parent }: { parent: Parent }) {
	const { token } = await parent();

	const data = await api.get(`links`, token);

	const respose = await data.json();

	return respose;
}
