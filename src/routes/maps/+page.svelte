<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import { refreshCollectionMap, refreshSpotswapState } from '$lib/services/collection-utils';
	import Card from '$lib/ui/Card.svelte';
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import { onMount } from 'svelte';
	import type { PageProps } from '../$types';

	subTitle.text = 'Spot Geo Data';
	let map: LeafletMap;
	let { data } = $$props as PageProps;

	onMount(async () => {
		await refreshSpotswapState(data.collections);
		await refreshCollectionMap(map);
	});
</script>

<Card title="Spot Locations">
	<LeafletMap height={60} bind:this={map} />
</Card>
