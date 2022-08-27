const base = import.meta.env ? import.meta.env.VITE_API_URL : '';

type Args = {
	method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET';
	path?: string;
	data?: any;
	token?: string;
};

async function send({ method, path, data, token }: Args) {
	const opts: any = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/api/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get({ path, token }: Args) {
	return send({ method: 'GET', path, token });
}

export function del({ path, token }: Args) {
	return send({ method: 'DELETE', path, token });
}

export function post({ path, data, token }: Args) {
	return send({ method: 'POST', path, data, token });
}

export function put({ path, data, token }: Args) {
	return send({ method: 'PUT', path, data, token });
}
