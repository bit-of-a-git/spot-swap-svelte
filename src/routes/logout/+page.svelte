<script lang="ts">
	import { goto } from '$app/navigation';
	import { spotswapService } from '$lib/services/spotswap-service';

	spotswapService.clearSession();
	goto('/');
</script>
