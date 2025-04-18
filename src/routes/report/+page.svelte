<script lang="ts">
	import { loggedInUser, subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import CollectionList from '$lib/ui/CollectionList.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';
	import { onMount } from 'svelte';
	import type { Collection } from '$lib/types/collection-types.ts';

	subTitle.text = 'Collections to date';

	let collections: Collection[] = [];
	onMount(async () => {
		collections = await spotswapService.getUserCollections(loggedInUser.token, loggedInUser._id);
	});
</script>

<Card title="Collections">
	<CollectionList {collections} />
</Card>
