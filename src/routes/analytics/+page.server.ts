import { loggedInUser } from '$lib/runes.svelte';
import { spotswapService } from '$lib/services/spotswap-service';
import type { Session } from '$lib/types/donation-types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const cookieStr = cookies.get('spotswap-user') as string;
	if (cookieStr) {
		const session = JSON.parse(cookieStr) as Session;
		return {
			collections: await spotswapService.getCollections(session.token),
			userCollections: await spotswapService.getUserCollections(loggedInUser._id, session.token)
		};
	}
};
