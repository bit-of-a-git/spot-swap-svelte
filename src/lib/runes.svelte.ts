import type { Collection } from './types/collection-types';

export const subTitle = $state({ text: '' });
export const loggedInUser = $state({
	email: '',
	name: '',
	token: '',
	_id: ''
});
export const currentCollections = $state({ collections: [] as Collection[] });
