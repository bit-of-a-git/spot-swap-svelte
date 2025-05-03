<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import CollectionForm from './CollectionForm.svelte';
	import CollectionList from '$lib/ui/CollectionList.svelte';

	subTitle.text = 'Dashboard';
</script>

<div class="columns">
	<div class="column">
		<Card title="Your Collections">
			<CollectionList />
		</Card>
	</div>
	<div class="column">
		<Card title="Add a Collection">
			<CollectionForm />
		</Card>
	</div>
</div>
