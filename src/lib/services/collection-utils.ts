import { categoryList, countyList } from '$lib/constants';
import { currentDataSets, loggedInUser } from '$lib/runes.svelte';
import type { Collection, Spot } from '$lib/types/collection-types';
import { spotswapService } from './spotswap-service';
import LeafletMap from '$lib/ui/LeafletMap.svelte';

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

export function computeByCategory(collectionList: Collection[]) {
	collectionList.forEach((collection) => {
		collection.spots.forEach((spot) => {
			const categoryIndex = categoryList.indexOf(spot.category);
			if (categoryIndex !== -1) {
				currentDataSets.spotsByCategory.datasets[0].values[categoryIndex] += 1;
			}
		});
	});
}

export function userComputeByCategory(collectionList: Collection[]) {
	collectionList.forEach((collection) => {
		collection.spots.forEach((spot) => {
			const categoryIndex = categoryList.indexOf(spot.category);
			if (categoryIndex !== -1) {
				currentDataSets.userSpotsByCategory.datasets[0].values[categoryIndex] += 1;
			}
		});
	});
}

export async function refreshDonationMap(map: LeafletMap) {
	if (!loggedInUser.token) spotswapService.restoreSession();
	const spots = await spotswapService.getSpots(loggedInUser.token);
	spots.forEach((spot: Spot) => {
		const popup = `<b>${spot.name}</b><br><i>${spot.category}</i><br>${spot.description}`;
		map.addMarker(spot.latitude, spot.longitude, popup);
	});
	const lastSpot = spots[spots.length - 1];
	if (lastSpot) map.moveTo(lastSpot.latitude, lastSpot.longitude);
}
