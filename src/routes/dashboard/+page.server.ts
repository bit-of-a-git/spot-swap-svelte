import { spotswapService } from '$lib/services/spotswap-service';
import type { Session } from '$lib/types/spotswap-types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    const userCollections = await spotswapService.getUserCollections(session._id, session.token);
    return {
      userCollections,
    };
  }
};

export const actions = {
  addCollection: async ({ request, cookies }) => {
    const cookieStr = cookies.get('spotswap-user') as string;
    if (cookieStr) {
      const session = JSON.parse(cookieStr) as Session;
      if (session) {
        const form = await request.formData();
        const collection = {
          title: form.get('title') as string,
          county: form.get('county') as string,
        };
        const newCollection = await spotswapService.addCollection(collection, session.token);
        return newCollection;
      }
    }
  },
};
