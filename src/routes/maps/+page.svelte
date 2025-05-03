<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import { onMount } from 'svelte';
	import { refreshDonationMap } from '$lib/services/collection-utils';

	subTitle.text = 'Spot Geo Data';
	let map: LeafletMap;

	onMount(async () => {
		await refreshDonationMap(map);
	});
</script>

<Card title="Spot Locations">
	<LeafletMap height={60} bind:this={map} />
</Card>
