<script lang="ts">
	import { goto } from '$app/navigation';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';
	import UserDetails from '$lib/ui/UserDetails.svelte';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let message = '';

	async function signup() {
		const success = false;
		if (success) {
			goto('/dashboard');
		} else {
			message = 'Error Trying to sign up';
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
