<script lang="ts">
	import { subTitle, currentCollections } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import { refreshSpotswapState } from '$lib/services/collection-utils';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
	import AllSpots from '$lib/ui/AllSpots.svelte';

	subTitle.text = 'Spots to Date';
	let { data }: PageProps = $props();

	onMount(async () => {
		refreshSpotswapState(data.collections, data.users);
	});
</script>

{#each currentCollections.collections as collection, index}
	<Card title={`${collection.title}`}>
		<AllSpots {collection} collectionIndex={index} />
	</Card>
{/each}
