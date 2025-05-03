<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import { currentDataSets } from '$lib/runes.svelte';
	// @ts-ignore
	import Chart from 'svelte-frappe-charts';
	import Card from '$lib/ui/Card.svelte';
	import { CollapsibleCard } from 'svelte-collapsible';

	subTitle.text = 'Analytics';
</script>

<CollapsibleCard>
	<div slot="header" class="card-header-title">Overall</div>
	<div slot="body">
		<div class="columns">
			<div class="column">
				<Card title="Collections By County">
					<Chart data={currentDataSets.collectionsByCounty} type="pie" />
				</Card>
			</div>
			<div class="column">
				<Card title="Spots By Category">
					<Chart data={currentDataSets.spotsByCategory} type="bar" />
				</Card>
			</div>
		</div>
	</div>
</CollapsibleCard>

<CollapsibleCard>
	<div slot="header" class="card-header-title">Your Analytics</div>
	<div slot="body">
		<div class="columns">
			<div class="column">
				<Card title="Collections per County">
					<Chart data={currentDataSets.userCollectionsByCounty} type="pie" />
				</Card>
			</div>
			<div class="column">
				<Card title="Spots per Category">
					<Chart data={currentDataSets.userSpotsByCategory} type="bar" />
				</Card>
			</div>
		</div>
	</div>
</CollapsibleCard>
