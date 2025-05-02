export interface Session {
	name: string;
	_id: string;
	token: string;
}

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	_id?: string;
}

export interface Collection {
	title: string;
	county: string;
	userId?: User | string;
	spots?: Spot[] | string[];
	_id?: string;
}

export interface Spot {
	name: string;
	description: string;
	collectionId?: Collection | string;
	category: string;
	img?: string;
	latitude: number;
	longitude: number;
}

export interface DataSet {
	labels: string[];
	datasets: [{ values: number[] }];
}
