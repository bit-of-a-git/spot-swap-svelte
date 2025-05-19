import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// Protected path list
const protectedPaths = ['/analytics', '/collection', '/dashboard', '/spots'];

const authHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Get the path name
	const pathName = event.url.pathname;

	// Get the auth token from the cookie
	const auth_token = event.cookies.get('spotswap-user');

	// You may need authorize auth_token in real world.

	// Redirect to the root if the user is not authenticated
	// and check if the path is in the protected path list
	if (protectedPaths.some((protectedPath) => pathName.startsWith(protectedPath)) && !auth_token) {
		console.log('For some reason, it is doing this');
		redirect(301, '/login');
	}

	return response;
};

export const handle = sequence(authHandle);
