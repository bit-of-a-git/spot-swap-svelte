<script lang="ts">
	import { currentDataSets, stats } from '$lib/runes.svelte';
	// @ts-ignore
	import Chart from 'svelte-frappe-charts';
	import Card from '$lib/ui/Card.svelte';
	import type { PageProps } from '../$types';
	import { subTitle } from '$lib/runes.svelte';
	import { CollapsibleCard } from 'svelte-collapsible';
	import { onMount } from 'svelte';

	import { refreshSpotswapState, refreshSpotswapAnalytics } from '$lib/services/collection-utils';

	let { data }: PageProps = $props();

	onMount(() => {
		refreshSpotswapState(data.collections);
		refreshSpotswapAnalytics(data.users);
	});

	const averageSpotsPerCollection = $derived(
		stats.collectionCount > 0 ? (stats.spotCount / stats.collectionCount).toFixed(2) : 0
	);

	subTitle.text = 'Analytics';
</script>

<CollapsibleCard>
	<div slot="header" class="card-header-title">Overall</div>
	<div slot="body" class="p-5">
		<div class="columns is-multiline">
			<div class="column is-half">
				<Card title="Collections By County" icon="fa-regular fa-map">
					<Chart data={currentDataSets.collectionsByCounty} type="pie" />
				</Card>
			</div>
			<div class="column is-half">
				<Card title="Spots By Category" icon="fa-solid fa-icons">
					<Chart data={currentDataSets.spotsByCategory} type="bar" />
				</Card>
			</div>
		</div>
	</div>
</CollapsibleCard>

<CollapsibleCard>
	<div slot="header" class="card-header-title">Statistics</div>
	<div slot="body" class="p-5">
		<div class="columns is-multiline">
			<div class="column is-one-third">
				<Card title="Total Collections" icon="fa-solid fa-route">
					<div class="title">{stats.collectionCount}</div>
				</Card>
			</div>
			<div class="column is-one-third">
				<Card title="Total Spots" icon="fa-solid fa-map-pin">
					<div class="title">{stats.spotCount}</div>
				</Card>
			</div>
			<div class="column is-one-third">
				<Card title="Average Spots Per Collection" icon="fa-solid fa-gauge">
					<div class="title">{averageSpotsPerCollection}</div>
				</Card>
			</div>
			<div class="column is-one-third">
				<Card title="Total Users" icon="fa-solid fa-users">
					<div class="title">{stats.userCount}</div>
				</Card>
			</div>
			<div class="column is-two-thirds">
				<Card title="Top Contributor" icon="fa-solid fa-award">
					<div class="content">
						<div class="title">
							{stats.topContributor.name} - {stats.topContributor.spotCount} spots
						</div>
						<div class="subtitle"></div>
					</div>
				</Card>
			</div>
		</div>
	</div>
</CollapsibleCard>
