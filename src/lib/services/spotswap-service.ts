import axios from 'axios';
import type { Session, User, Collection } from '$lib/types/collection-types';

export const spotswapService = {
	baseUrl: 'http://localhost:3000',

	async signup(user: User): Promise<boolean> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users`, user);
			return response.data.success === true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async login(email: string, password: string): Promise<Session | null> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
				email,
				password
			});
			if (response.data.success) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
				const session: Session = {
					name: response.data.name,
					token: response.data.token,
					_id: response.data._id
				};
				return session;
			}
			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async addCollection(collection: Collection, token: string) {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.post(this.baseUrl + '/api/collections', collection);
			return response.status == 200;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async getCollections(token: string): Promise<Collection[]> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.get(this.baseUrl + '/api/collections');
			return response.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	async getUserCollections(token: string, id: string): Promise<Collection[]> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.get(this.baseUrl + '/api/collections/user/' + id);
			return response.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
};
