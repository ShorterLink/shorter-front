import * as api from '$lib/api';

export async function validadeUserSession(token: string) {
	const data = await api.get(`me`, token);

	if (data.status > 200) {
		return false;
	}

	const response = await data.json();

	return response?.user || false;
}
