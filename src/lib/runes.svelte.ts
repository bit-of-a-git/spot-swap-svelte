import { categoryList } from './constants';
import type { Collection } from './types/spotswap-types';

export const subTitle = $state({ text: '' });
export const loggedInUser = $state({
  email: '',
  name: '',
  token: '',
  _id: '',
});

// Stores global and user collections
export const currentCollections = $state({ collections: [] as Collection[] });
export const userCollections = $state({ collections: [] as Collection[] });

// Stores the current collection being viewed or edited
export const currentCollection = $state({ collection: {} as Collection });

export const currentDataSets = $state({
  collectionsByCounty: {
    labels: [] as string[],
    datasets: [
      {
        values: [] as number[],
      },
    ],
  },
  spotsByCategory: {
    labels: categoryList,
    datasets: [
      {
        values: Array(categoryList.length).fill(0),
      },
    ],
  },
  userCollectionsByCounty: {
    labels: [] as string[],
    datasets: [
      {
        values: [] as number[],
      },
    ],
  },
  userSpotsByCategory: {
    labels: categoryList,
    datasets: [
      {
        values: Array(categoryList.length).fill(0),
      },
    ],
  },
});

export const stats = $state({
  collectionCount: 0,
  spotCount: 0,
  userCount: 0,
  topContributor: {
    name: '',
    spotCount: 0,
  },
});
