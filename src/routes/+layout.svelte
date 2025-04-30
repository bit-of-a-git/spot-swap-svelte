<script lang="ts">
	import { loggedInUser } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';
	import Heading from '$lib/ui/Heading.svelte';
	import Menu from '$lib/ui/Menu.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		await spotswapService.restoreSession();
	});
</script>

<div class="container">
	{#if loggedInUser.email}
		<Menu />
		<Heading />
	{/if}
	<slot />
</div>
