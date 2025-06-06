import type { Session } from '$lib/types/spotswap-types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
  const cookieStr = cookies.get('spotswap-user') as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      session: session,
    };
  }
};
