<script lang="ts">
	import { loggedInUser, subTitle } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';
	import Card from '$lib/ui/Card.svelte';
	import { onMount } from 'svelte';
	import CollectionForm from './CollectionForm.svelte';
	import type { Collection } from '$lib/types/collection-types.ts';
	import CollectionList from '$lib/ui/CollectionList.svelte';

	subTitle.text = 'Add a Collection';
	let collections: Collection[] = [];

	onMount(async () => {
		collections = await spotswapService.getUserCollections(loggedInUser.token, loggedInUser._id);
	});
</script>

<div class="columns">
	<div class="column">
		<Card title="Your Collections">
			<CollectionList {collections} />
		</Card>
	</div>
	<div class="column">
		<Card title="Add a Collection">
			<CollectionForm />
		</Card>
	</div>
</div>
