import axios from 'axios';
import type { Session, User, Collection, Spot } from '$lib/types/spotswap-types';
import {
	currentCollections,
	userCollections,
	loggedInUser,
	currentDataSets
} from '$lib/runes.svelte';
import {
	computeByCategory,
	computeByCounty,
	userComputeByCategory,
	userComputeByCounty
} from './collection-utils';
import { categoryList, countyList } from '$lib/constants';

export const spotswapService = {
	baseUrl: import.meta.env.VITE_BACKEND_API_URL,

	async signup(user: User): Promise<boolean> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users`, user);
			return response.status === 201;
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
			return response.data;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async getCollections(token: string): Promise<Collection[]> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.get(this.baseUrl + '/api/collections');
			return response.data as Collection[];
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	async getUserCollections(id: string, token: string): Promise<Collection[]> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.get(this.baseUrl + '/api/collections/user/' + id);
			return response.data as Collection[];
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	async getCollectionById(id: string, token: string): Promise<Collection | null> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.get(this.baseUrl + '/api/collections/' + id);
			return response.data as Collection;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async deleteCollection(id: string, token: string): Promise<boolean> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.delete(this.baseUrl + '/api/collections/' + id);
			if (response.status == 204) {
				await this.refreshCollectionInfo();
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async addSpot(id: string, spot: Spot, token: string): Promise<Spot | null> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.post(this.baseUrl + '/api/collections/' + id + '/spots', spot);
			return response.data as Spot;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async getSpots(token: string): Promise<Spot[]> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.get(this.baseUrl + '/api/spots');
			return response.data as Spot[];
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	async deleteSpot(id: string, token: string): Promise<boolean> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.delete(this.baseUrl + '/api/spots/' + id);
			if (response.status == 204) {
				await this.refreshCollectionInfo();
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async uploadImage(id: string, image: FormData, token: string): Promise<boolean> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.post(this.baseUrl + '/api/spots/' + id + '/image', image);
			if (response.status == 201) {
				await this.refreshCollectionInfo();
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async deleteImage(id: string, token: string): Promise<boolean> {
		try {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			const response = await axios.delete(this.baseUrl + '/api/spots/' + id + '/image');
			if (response.status == 204) {
				await this.refreshCollectionInfo();
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	saveSession(session: Session, email: string) {
		loggedInUser.email = email;
		loggedInUser.name = session.name;
		loggedInUser.token = session.token;
		loggedInUser._id = session._id;
		localStorage.collection = JSON.stringify(loggedInUser);
	},

	async restoreSession() {
		const savedLoggedInUser = localStorage.collection;
		if (savedLoggedInUser) {
			const session = JSON.parse(savedLoggedInUser);
			loggedInUser.email = session.email;
			loggedInUser.name = session.name;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;
		}
		await this.refreshCollectionInfo();
	},

	clearSession() {
		currentCollections.collections = [];
		userCollections.collections = [];
		loggedInUser.email = '';
		loggedInUser.name = '';
		loggedInUser.token = '';
		loggedInUser._id = '';
		localStorage.removeItem('collection');
	},

	async refreshCollectionInfo() {
		if (loggedInUser.token) {
			userCollections.collections = await this.getUserCollections(
				loggedInUser._id,
				loggedInUser.token
			);
			currentCollections.collections = await this.getCollections(loggedInUser.token);

			currentDataSets.collectionsByCounty.datasets[0].values = Array(countyList.length).fill(0);
			currentDataSets.spotsByCategory.datasets[0].values = Array(categoryList.length).fill(0);
			currentDataSets.userCollectionsByCounty.datasets[0].values = Array(countyList.length).fill(0);
			currentDataSets.userSpotsByCategory.datasets[0].values = Array(categoryList.length).fill(0);

			computeByCounty(currentCollections.collections);
			userComputeByCounty(userCollections.collections);
			computeByCategory(currentCollections.collections);
			userComputeByCategory(userCollections.collections);
		}
	}
};
