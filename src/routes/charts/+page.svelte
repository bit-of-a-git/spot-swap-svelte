<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import { currentDataSets } from '$lib/runes.svelte';
	// @ts-ignore
	import Chart from 'svelte-frappe-charts';
	import Card from '$lib/ui/Card.svelte';

	subTitle.text = 'Collections Data';
</script>

<div class="columns">
	<div class="column">
		<Card title="Collections By County">
			<Chart data={currentDataSets.collectionsByCounty} type="pie" />
		</Card>
	</div>
	<div class="column">
		<Card title="Collections By County">
			<Chart data={currentDataSets.spotsByCategory} type="line" />
		</Card>
	</div>
</div>
