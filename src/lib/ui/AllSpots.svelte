<script lang="ts">
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import type { Spot } from '$lib/types/spot';
	import { onMount } from 'svelte';

	let map: LeafletMap;

	let { collection, collectionIndex } = $props();

	onMount(async () => {
		const spots = collection.spots;
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

{#if collection.spots?.length}
	<LeafletMap height={50} bind:this={map} id="map-{collectionIndex}" />

	{#each collection.spots as spot}
		<section class="section">
			<div class="title">{spot.name}</div>
			<div class="subtitle is-6 has-text-warning">{spot.category}</div>
			<div class="columns">
				<div class="column">{spot.description}</div>
			</div>
			{#if spot.img}
				<div class="columns is-centered">
					<div class="column is-half">
						<div class="card-image">
							<figure class="image is-256x256">
								<img src={spot.img} alt="Picture of {spot.name}" />
							</figure>
						</div>
					</div>
				</div>
			{/if}
		</section>
	{/each}
{:else}
	<div class="subtitle">No Spots</div>
{/if}
