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
        password,
      };

      const response = await spotswapService.signup(user);
      // Checks if the signup was successful. If not, passes in the error message.
      if (response.success) {
        goto('/login');
      } else {
        message = response.message || 'Error signing up';
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
  <div class="has-text-centered">
    <button onclick={() => signup()} class="button is-success mb-2">Sign Up</button>
  </div>
  <p class="has-text-centered">
    Already have an account? <a href="/login" data-cy="login-redirect">Log in here</a>
  </p>
  <div class="mt-2">
    {#if message}
      <Message {message} />
    {/if}
  </div>
</div>
