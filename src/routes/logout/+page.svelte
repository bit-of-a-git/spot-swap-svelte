<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { clearSpotswapState } from '$lib/services/collection-utils';

	clearSpotswapState();
	if (browser) goto('/');
</script>
