import { redirect } from '@sveltejs/kit';

const base = 'http://localhost:4000/api';

type Args = {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	path?: string;
	data?: any;
	token?: string;
};

async function send({ method, path, data, token }: Args) {
	const opts: any = { method, headers: {} };

	let userToken = token;

	if (token?.includes('=')) {
		userToken = token.split('=')[1];
	}

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (userToken) {
		opts.headers['Authorization'] = `Bearer ${userToken}`;
	}

	const respose = await fetch(`${base}/${path}`, opts);

	if (respose.status === 401) {
		const respon = await respose.text();
		console.log(respon);

		unauthorized();
	}

	return respose;
}

export function get(path: string, token: string) {
	return send({ method: 'GET', path, token });
}

export function del(path: string, token: string) {
	return send({ method: 'DELETE', path, token });
}

export function post(path: string, data?: any, token?: string) {
	return send({ method: 'POST', path, data, token });
}

export function put(path: string, data?: any, token?: string) {
	return send({ method: 'PUT', path, data, token });
}

function unauthorized() {
	throw redirect(301, '/login?private=true');
}
