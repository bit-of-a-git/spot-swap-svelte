import { spotswapService } from '$lib/services/spotswap-service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      collections: await spotswapService.getCollections(session.token),
      users: await spotswapService.getUsers(session.token),
    };
  }
};
