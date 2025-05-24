import { categoryList, countyList } from '$lib/constants';
import {
	currentDataSets,
	loggedInUser,
	currentCollections,
	userCollections,
	currentCollection,
	stats
} from '$lib/runes.svelte';
import type { Collection, Spot, User } from '$lib/types/spotswap-types';
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
		if (collection.spots) {
			collection.spots.forEach((spot) => {
				const categoryIndex = categoryList.indexOf(spot.category);
				if (categoryIndex !== -1) {
					currentDataSets.spotsByCategory.datasets[0].values[categoryIndex] += 1;
				}
			});
		}
	});
}

export function userComputeByCategory(collectionList: Collection[]) {
	collectionList.forEach((collection) => {
		if (collection.spots) {
			collection.spots.forEach((spot) => {
				const categoryIndex = categoryList.indexOf(spot.category);
				if (categoryIndex !== -1) {
					currentDataSets.userSpotsByCategory.datasets[0].values[categoryIndex] += 1;
				}
			});
		}
	});
}

export function getCollectionTotal(collectionList: Collection[]) {
	const total = collectionList.length;
	stats.collectionCount = total;
}

export function getSpotTotal(collectionList: Collection[]) {
	const total = collectionList.reduce((sum, collection) => {
		return sum + (collection.spots?.length || 0);
	}, 0);

	// Update the stats state
	stats.spotCount = total;
}

export function getUserTotal(userList: User[]) {
	const total = userList.length;
	stats.userCount = total;
}

export function findUserWithMostSpots(collections: Collection[], users: User[]) {
	const userSpotCount = new Map<string, number>();
	collections.forEach((collection) => {
		const userId = collection.userId;
		const spotCount = collection.spots?.length || 0;

		// Add to user's total
		const currentCount = userSpotCount.get(userId) || 0;
		userSpotCount.set(userId, currentCount + spotCount);
	});

	// Find user with most spots
	let maxUserId = '';
	let maxSpotsCount = 0;

	userSpotCount.forEach((count, userId) => {
		if (count > maxSpotsCount) {
			maxSpotsCount = count;
			maxUserId = userId;
		}
	});

	// Find the user details
	const topUser = users.find((user) => user._id === maxUserId);

	// Update stats
	if (topUser) {
		stats.topContributor = {
			name: `${topUser.firstName} ${topUser.lastName}`,
			spotCount: maxSpotsCount
		};
	} else {
		stats.topContributor = {
			name: 'No users yet',
			spotCount: 0
		};
	}
}

export async function refreshCollectionMap(map: LeafletMap, spots: Spot[]) {
	spots.forEach((spot: Spot) => {
		const popup = `<b>${spot.name}</b><br><i>${spot.category}</i><br>${spot.description}`;
		map.addMarker(spot.latitude, spot.longitude, popup);
	});
	const lastSpot = spots[spots.length - 1];
	if (lastSpot) map.moveTo(lastSpot.latitude, lastSpot.longitude);
}

export async function refreshSpotswapState(collections: Collection[]) {
	currentCollections.collections = collections;
}

export async function refreshSpotswapAnalytics(users: User[]) {
	currentDataSets.collectionsByCounty.datasets[0].values = Array(countyList.length).fill(0);
	currentDataSets.spotsByCategory.datasets[0].values = Array(categoryList.length).fill(0);

	computeByCounty(currentCollections.collections);
	computeByCategory(currentCollections.collections);
	getCollectionTotal(currentCollections.collections);
	getSpotTotal(currentCollections.collections);
	getUserTotal(users);
	findUserWithMostSpots(currentCollections.collections, users);
}

export async function refreshUserState(collections: Collection[]) {
	userCollections.collections = collections;

	currentDataSets.userCollectionsByCounty.datasets[0].values = Array(countyList.length).fill(0);
	currentDataSets.userSpotsByCategory.datasets[0].values = Array(categoryList.length).fill(0);

	userComputeByCounty(userCollections.collections);
	userComputeByCategory(userCollections.collections);
}

export async function refreshCollectionState(collection: Collection) {
	currentCollection.collection = collection;
}

export function clearSpotswapState() {
	currentCollections.collections = [];
	userCollections.collections = [];
	loggedInUser.email = '';
	loggedInUser.name = '';
	loggedInUser.token = '';
	loggedInUser._id = '';
}
