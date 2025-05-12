<script lang="ts">
	import { userCollections, subTitle, currentDataSets } from '$lib/runes.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import Card from '$lib/ui/Card.svelte';
	import CollectionForm from './CollectionForm.svelte';
	import CollectionList from '$lib/ui/CollectionList.svelte';
	import { onMount } from 'svelte';
	import { refreshUserState } from '$lib/services/collection-utils';
	import type { Collection } from '$lib/types/spotswap-types';
	import type { PageProps } from './$types';
	import { CollapsibleCard } from 'svelte-collapsible';
	import Chart from 'svelte-frappe-charts';

	subTitle.text = 'Dashboard';

	let { data }: PageProps = $props();
	let message = $state('');

	const handleCollectionSuccess = () => {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				const collection = result.data as Collection;
				userCollections.collections.push(collection);
				refreshUserState(userCollections.collections);
				message = `You added a "${collection.title}" collection to Co. ${collection.county}`;
			}
		};
	};

	onMount(async () => {
		await refreshUserState(data.userCollections);
	});
</script>

<div class="columns">
	<div class="column">
		<Card title="Your Collections">
			<CollectionList />
		</Card>
	</div>
	<div class="column">
		<Card title="Add a Collection">
			<CollectionForm enhanceFn={handleCollectionSuccess} {message} />
		</Card>
	</div>
</div>

<CollapsibleCard>
	<div slot="header" class="card-header-title">Statistics</div>
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
