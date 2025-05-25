<script lang="ts">
  import Message from '$lib/ui/Message.svelte';
  import UserCredentials from '$lib/ui/UserCredentials.svelte';

  let message = '';
</script>

{#if message}
  <Message {message} />
{/if}
<form method="POST" action="?/login">
  <UserCredentials />
  <button class="button is-success is-fullwidth mb-2">Log In</button>
  <p class="has-text-centered">
    Haven't registered yet? <a href="/signup" data-cy="login-redirect">Sign up here</a>
  </p>
</form>
