import { loggedInUser } from '$lib/runes.svelte.js';
import { spotswapService } from '$lib/services/spotswap-service.js';
import type { Collection } from '$lib/types/collection-types.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;
	try {
		const collection = await spotswapService.getCollectionById(id, loggedInUser.token);
		if (!collection) {
			throw error(404, 'Collection not found');
		}
		return collection as Collection;
	} catch (err) {
		console.error(err);
		throw error(500, err as string);
	}
};
