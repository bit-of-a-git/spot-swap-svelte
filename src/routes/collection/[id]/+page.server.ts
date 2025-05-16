import { spotswapService } from '$lib/services/spotswap-service';
import type { Session } from '$lib/types/spotswap-types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { id } = params;
	const { session } = await parent();
	if (session && id) {
		const collection = await spotswapService.getCollectionById(id, session.token);
		return {
			collection
		};
	}
};

export const actions = {
	addSpot: async ({ request, cookies, params }) => {
		const { id } = params;
		const cookieStr = cookies.get('spotswap-user') as string;
		if (cookieStr) {
			const session = JSON.parse(cookieStr) as Session;
			if (session) {
				const form = await request.formData();
				const spot = {
					name: form.get('name') as string,
					description: form.get('description') as string,
					category: form.get('category') as string,
					latitude: form.get('latitude') as unknown as number,
					longitude: form.get('longitude') as unknown as number
				};
				const newSpot = await spotswapService.addSpot(id, spot, session.token);
				return newSpot;
			}
		}
	}
};
