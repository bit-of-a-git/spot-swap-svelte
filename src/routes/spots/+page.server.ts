import { spotswapService } from '$lib/services/spotswap-service';
import type { Session } from '$lib/types/collection-types';
import type { PageServerLoad } from './$types';
import { loggedInUser } from '$lib/runes.svelte';

export const load: PageServerLoad = async ({ cookies }) => {
	const cookieStr = cookies.get('spotswap-user') as string;
	if (cookieStr) {
		const session = JSON.parse(cookieStr) as Session;
		return {
			collections: await spotswapService.getCollections(session.token)
		};
	}
};
