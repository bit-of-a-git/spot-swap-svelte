<script lang="ts">
	import { subTitle, currentCollection } from '$lib/runes.svelte.js';
	import type { ActionResult } from '@sveltejs/kit';
	import Card from '$lib/ui/Card.svelte';
	import SpotForm from './SpotForm.svelte';
	import SpotList from '$lib/ui/SpotList.svelte';
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import { onMount } from 'svelte';
	import type { Spot } from '$lib/types/spotswap-types';
	import type { PageProps } from './$types';
	import { refreshCollectionState, refreshCollectionMap } from '$lib/services/collection-utils';

	let { data }: PageProps = $props();
	let message = $state('');
	let map: LeafletMap;

	$effect(() => {
		refreshCollectionMap(map, currentCollection.collection.spots);
	});

	const handleSpotSuccess = () => {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				const spot = result.data as Spot;
				data.collection.spots.push(spot);
				await refreshCollectionState(data.collection);
			}
		};
	};

	onMount(async () => {
		await refreshCollectionState(data.collection);
		subTitle.text = currentCollection.collection.title;
	});
</script>

<div class="columns">
	<div class="column is-half">
		<Card title="Spots to Date">
			<LeafletMap height={50} bind:this={map} />
		</Card>
	</div>
	<div class="column is-half">
		<Card title="Add Spot">
			<SpotForm enhanceFn={handleSpotSuccess} {message} />
		</Card>
	</div>
</div>
<SpotList />
