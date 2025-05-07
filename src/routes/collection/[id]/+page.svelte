<script lang="ts">
	import { subTitle } from '$lib/runes.svelte.js';
	import type { ActionResult } from '@sveltejs/kit';
	import Card from '$lib/ui/Card.svelte';
	import SpotForm from './SpotForm.svelte';
	import SpotList from '$lib/ui/SpotList.svelte';
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import { onMount } from 'svelte';
	import type { Spot } from '$lib/types/spotswap-types';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let message = $state('');

	const handleSpotSuccess = () => {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				const spot = result.data as Spot;
				data.collection.spots.push(spot);
				const popup = `<b>${spot.name}</b><br><i>${spot.category}</i><br>${spot.description}`;
				map.addMarker(spot.latitude, spot.longitude, popup);
				message = `You added a "${spot.name}" spot to the ${data.collection.title} collection`;
			}
		};
	};

	let map: LeafletMap;

	onMount(async () => {
		subTitle.text = data.collection.title;
		const spots = data.collection.spots;
		if (spots.length > 0) {
			spots.forEach((spot: Spot) => {
				const popup = `<b>${spot.name}</b><br><i>${spot.category}</i><br>${spot.description}`;
				map.addMarker(spot.latitude, spot.longitude, popup);
			});
			const lastSpot = spots[spots.length - 1];
			if (lastSpot) map.moveTo(lastSpot.latitude, lastSpot.longitude);
		}
	});
</script>

<Card title="Spots to Date">
	<LeafletMap height={30} bind:this={map} />
</Card>

{#if data.collection.spots.length > 0}
	<Card title="Collection">
		<SpotList collection={data.collection} />
	</Card>
{/if}

<Card title="Add Spot">
	<SpotForm enhanceFn={handleSpotSuccess} {message} />
</Card>
