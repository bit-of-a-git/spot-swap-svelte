<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import CollectionForm from './CollectionForm.svelte';

	subTitle.text = 'Add a Collection';
</script>

<Card title="Add a Collection">
	<CollectionForm />
</Card>
