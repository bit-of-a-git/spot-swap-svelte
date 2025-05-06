<script lang="ts">
	import { userCollections, subTitle } from '$lib/runes.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import Card from '$lib/ui/Card.svelte';
	import CollectionForm from './CollectionForm.svelte';
	import CollectionList from '$lib/ui/CollectionList.svelte';
	import { onMount } from 'svelte';
	import { refreshUserState } from '$lib/services/collection-utils';
	import type { Collection } from '$lib/types/collection-types';
	import type { PageProps } from './$types';

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
