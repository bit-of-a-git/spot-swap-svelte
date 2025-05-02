import { categoryList, countyList } from '$lib/constants';
import { currentDataSets } from '$lib/runes.svelte';
import type { Collection, Spot } from '$lib/types/collection-types';

export function computeByCounty(collectionList: Collection[]) {
	collectionList.forEach((collection) => {
		const countyIndex = countyList.indexOf(collection.county);
		if (countyIndex !== -1) {
			currentDataSets.collectionsByCounty.datasets[0].values[countyIndex] += 1;
		}
	});
}

export function userComputeByCounty(collectionList: Collection[]) {
	collectionList.forEach((collection) => {
		const countyIndex = countyList.indexOf(collection.county);
		if (countyIndex !== -1) {
			currentDataSets.userCollectionsByCounty.datasets[0].values[countyIndex] += 1;
		}
	});
}

export function computeByCategory(spotList: Spot[]) {
	spotList.forEach((spot) => {
		const categoryIndex = categoryList.indexOf(spot.category);
		if (categoryIndex !== -1) {
			currentDataSets.spotsByCategory.datasets[0].values[categoryIndex] += 1;
		}
	});
}
