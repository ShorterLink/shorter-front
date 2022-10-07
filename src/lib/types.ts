export type Links = {
	clicks: number;
	enabled: boolean;
	hash_url: string;
	id: string;
	inserted_at: string;
	name: string;
	updated_at: string;
	url: string;
};

export type User = {
	email: string;
	id: string;
	inserted_at: string;
	name: string;
};

export type Parent = () => {
	user: User;
	token: string;
};

export type APIResponse<T> = {
	data: [T];
	page_number: number;
	page_size: number;
	total_entries: number;
	total_pages: number;
};
