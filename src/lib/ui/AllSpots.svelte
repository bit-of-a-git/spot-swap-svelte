<script lang="ts">
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import { onMount } from 'svelte';
	import { refreshCollectionMap } from '$lib/services/collection-utils';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';

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
			<div class="column">
				<p>{spot.description}</p>
			</div>
		</div>
		{#if spot.images?.length}
			<div class="columns is-multiline is-centered">
				<div class="column is-half">
					{#if browser}
						{#key spot.images}
							<Carousel>
								{#each spot.images as img}
									<div class="card-image">
										<img src={img} alt="Image of {spot.name}" />
									</div>
								{/each}
							</Carousel>
						{/key}
					{/if}
				</div>
			</div>
		{/if}
	</section>
{/each}
