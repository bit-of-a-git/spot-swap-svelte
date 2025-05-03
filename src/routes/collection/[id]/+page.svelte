<script lang="ts">
	import { subTitle } from '$lib/runes.svelte.js';
	import Card from '$lib/ui/Card.svelte';
	import SpotList from '$lib/ui/SpotList.svelte';
	import SpotForm from './SpotForm.svelte';
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import type { Spot, Collection } from '$lib/types/collection-types';
	import { onMount } from 'svelte';

	export let data: Collection;

	subTitle.text = data.title;
	let map: LeafletMap;

	function spotAdded(spot: Spot) {
		map.addMarker(spot.latitude, spot.longitude, '');
		map.moveTo(spot.latitude, spot.longitude);
	}

	onMount(async () => {
		if (data.spots.length > 0) {
			data.spots.forEach((spot: Spot) => {
				const popup = `<b>${spot.name}</b><br><i>${spot.category}</i><br>${spot.description}`;
				map.addMarker(spot.latitude, spot.longitude, popup);
			});
			const lastSpot = data.spots[data.spots.length - 1];
			if (lastSpot) map.moveTo(lastSpot.latitude, lastSpot.longitude);
		}
	});
</script>

<Card title="Spots to Date">
	<LeafletMap height={30} bind:this={map} />
</Card>

<Card title="Collection">
	<SpotList collection={data} />
</Card>

<Card title="Add Spot">
	<SpotForm id={data._id} spotEvent={spotAdded} />
</Card>
