import { categoryList, countyList } from './constants';
import type { Collection, Spot } from './types/collection-types';

export const subTitle = $state({ text: '' });
export const loggedInUser = $state({
	email: '',
	name: '',
	token: '',
	_id: ''
});

export const currentCollections = $state({ collections: [] as Collection[] });
export const userCollections = $state({ collections: [] as Collection[] });

export const currentSpots = $state({ spots: [] as Spot[] });
export const userSpots = $state({ spots: [] as Spot[] });

export const currentDataSets = $state({
	collectionsByCounty: {
		labels: countyList,
		datasets: [
			{
				values: Array(countyList.length).fill(0)
			}
		]
	},
	spotsByCategory: {
		labels: categoryList,
		datasets: [
			{
				values: Array(categoryList.length).fill(0)
			}
		]
	},
	userCollectionsByCounty: {
		labels: countyList,
		datasets: [
			{
				values: Array(countyList.length).fill(0)
			}
		]
	}
});
