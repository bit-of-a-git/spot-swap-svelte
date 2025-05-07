export const load = async ({ cookies }) => {
	cookies.delete('spotswap-user', { path: '/' });
};
