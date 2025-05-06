<script lang="ts">
	import { subTitle, currentCollections } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import SpotList from '$lib/ui/SpotList.svelte';
	import { refreshSpotswapState } from '$lib/services/collection-utils';
	import type { PageProps } from './$types';

	subTitle.text = 'Spots to Date';
	let { data }: PageProps = $props();
	refreshSpotswapState(data.collections);
</script>

{#each currentCollections.collections as collection}
	<Card title={`${collection.title}`}>
		<SpotList {collection} />
	</Card>
{/each}
