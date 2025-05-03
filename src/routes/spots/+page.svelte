<script lang="ts">
	import { loggedInUser, subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import SpotList from '$lib/ui/SpotList.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';
	import { onMount } from 'svelte';
	import type { Collection } from '$lib/types/collection-types.ts';

	subTitle.text = 'Spots to Date';

	let collections: Collection[] = [];
	onMount(async () => {
		collections = await spotswapService.getCollections(loggedInUser.token);
	});
</script>

{#each collections as collection}
	<Card title={`${collection.title}`}>
		<SpotList {collection} />
	</Card>
{/each}
