<script lang="ts">
	import { currentDataSets } from '$lib/runes.svelte';
	// @ts-ignore
	import Chart from 'svelte-frappe-charts';
	import Card from '$lib/ui/Card.svelte';
	import type { PageProps } from '../$types';
	import { subTitle } from '$lib/runes.svelte';
	import { CollapsibleCard } from 'svelte-collapsible';

	import { refreshSpotswapState, refreshUserState } from '$lib/services/collection-utils';

	let { data } = $$props as PageProps;
	refreshSpotswapState(data.collections);
	refreshUserState(data.userCollections);
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
