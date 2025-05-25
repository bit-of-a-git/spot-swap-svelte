import { categoryList } from '$lib/constants';
import {
  currentDataSets,
  loggedInUser,
  currentCollections,
  userCollections,
  currentCollection,
  stats,
} from '$lib/runes.svelte';
import type { Collection, Spot, User } from '$lib/types/spotswap-types';
import LeafletMap from '$lib/ui/LeafletMap.svelte';

export function computeByCounty(collectionList: Collection[]) {
  collectionList.forEach((collection) => {
    // Checks if the county is already in the labels.
    const labelIndex = currentDataSets.collectionsByCounty.labels.indexOf(collection.county);
    if (labelIndex === -1) {
      currentDataSets.collectionsByCounty.labels.push(collection.county);
      currentDataSets.collectionsByCounty.datasets[0].values.push(1);
    } else {
      // If the county is already present, increments its value
      currentDataSets.collectionsByCounty.datasets[0].values[labelIndex] += 1;
    }
  });
}

// This performs the same operation as computeByCounty but for user collections.
export function userComputeByCounty(collectionList: Collection[]) {
  collectionList.forEach((collection) => {
    const labelIndex = currentDataSets.userCollectionsByCounty.labels.indexOf(collection.county);
    if (labelIndex === -1) {
      currentDataSets.userCollectionsByCounty.labels.push(collection.county);
      currentDataSets.userCollectionsByCounty.datasets[0].values.push(1);
    } else {
      currentDataSets.userCollectionsByCounty.datasets[0].values[labelIndex] += 1;
    }
  });
}

export function computeByCategory(collectionList: Collection[]) {
  collectionList.forEach((collection) => {
    if (collection.spots) {
      collection.spots.forEach((spot) => {
        // Checks if the category is valid.
        const categoryIndex = categoryList.indexOf(spot.category);
        if (categoryIndex !== -1) {
          currentDataSets.spotsByCategory.datasets[0].values[categoryIndex] += 1;
        }
      });
    }
  });
}

// Performs the same operation as computeByCategory but for user collections.
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

// Uses reduce method to iterate through collectionList and sum up the total number of spots.
export function getSpotTotal(collectionList: Collection[]) {
  const total = collectionList.reduce((sum, collection) => {
    return sum + (collection.spots?.length || 0);
  }, 0);

  // Once finished, updates the stats state
  stats.spotCount = total;
}

export function getUserTotal(userList: User[]) {
  const total = userList.length;
  stats.userCount = total;
}

export function findUserWithMostSpots(collections: Collection[], users: User[]) {
  const userSpotCount = new Map<string, number>();
  // Iterate through collections and count spots for each user
  collections.forEach((collection) => {
    const userId = collection.userId;
    const spotCount = collection.spots?.length || 0;

    // If the userId is not in the map, initialises it with a value of 0
    const currentCount = userSpotCount.get(userId) || 0;
    // Adds the current spot count to the user's total
    userSpotCount.set(userId, currentCount + spotCount);
  });

  // Find user with most spots
  let maxUserId = '';
  let maxSpotsCount = 0;

  // Iterate through the map to find the user with the maximum spot count
  userSpotCount.forEach((count, userId) => {
    if (count > maxSpotsCount) {
      maxSpotsCount = count;
      maxUserId = userId;
    }
  });

  // Goes through the users array to find the user object with the maxUserId
  const topUser = users.find((user) => user._id === maxUserId);

  // If a user is found, updates the stats with their name and spot count
  // If no user is found, says "No users yet" and sets spot count to 0
  if (topUser) {
    stats.topContributor = {
      name: `${topUser.firstName} ${topUser.lastName}`,
      spotCount: maxSpotsCount,
    };
  } else {
    stats.topContributor = {
      name: 'No users yet',
      spotCount: 0,
    };
  }
}

// Refreshes the collection map with the provided spots.
export async function refreshCollectionMap(map: LeafletMap, spots: Spot[]) {
  map.clearMarkers();
  spots.forEach((spot: Spot) => {
    const popup = `<b>${spot.name}</b><br><i>${spot.category}</i><br>${spot.description}`;
    map.addMarker(spot.latitude, spot.longitude, popup);
  });
  const lastSpot = spots[spots.length - 1];
  if (lastSpot) map.moveTo(lastSpot.latitude, lastSpot.longitude);
}

// Used to refresh the state of the collections in the Spotswap application.
export async function refreshSpotswapState(collections: Collection[]) {
  currentCollections.collections = collections;
}

export async function refreshSpotswapAnalytics(users: User[]) {
  currentDataSets.collectionsByCounty = { labels: [], datasets: [{ values: [] }] };
  currentDataSets.spotsByCategory.datasets[0].values = Array(categoryList.length).fill(0);

  computeByCounty(currentCollections.collections);
  computeByCategory(currentCollections.collections);
  getCollectionTotal(currentCollections.collections);
  getSpotTotal(currentCollections.collections);
  getUserTotal(users);
  findUserWithMostSpots(currentCollections.collections, users);
}

// Refreshes user state and analytics
export async function refreshUserState(collections: Collection[]) {
  userCollections.collections = collections;

  currentDataSets.userCollectionsByCounty = { labels: [], datasets: [{ values: [] }] };
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
