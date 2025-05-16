<script lang="ts">
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import { onMount } from 'svelte';
	import { refreshCollectionMap } from '$lib/services/collection-utils';

	let map: LeafletMap;

	let { collection, collectionIndex } = $props();

	onMount(async () => {
		await refreshCollectionMap(map, collection.spots);
	});
</script>

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
