<script lang="ts">
	import { goto } from '$app/navigation';
	import { spotswapService } from '$lib/services/spotswap-service';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';
	import UserDetails from '$lib/ui/UserDetails.svelte';
	import Message from '$lib/ui/Message.svelte';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let message = '';

	async function signup() {
		try {
			const user = {
				firstName,
				lastName,
				email,
				password
			};

			const response = await spotswapService.signup(user);
			if (response) {
				goto('/login');
			} else {
				message = 'Error signing up';
			}
		} catch (error) {
			console.error('Error during signup:', error);
			message = 'An error occurred. Please try again.';
		}
	}
</script>

<div class="box">
	<UserDetails bind:firstName bind:lastName />
	<UserCredentials bind:email bind:password />
	<button onclick={() => signup()} class="button">Sign Up</button>
	<p class="has-text-centered">
		Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a>
	</p>
</div>
{#if message}
	<Message {message} />
{/if}
