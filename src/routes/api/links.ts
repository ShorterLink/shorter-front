export async function get(context) {
	console.log(context);
	return {
		status: 200,
		body: 'oi'
	};
}
