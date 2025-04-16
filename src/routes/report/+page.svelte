<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import CollectionList from '$lib/ui/CollectionList.svelte';

	subTitle.text = 'Collections to date';
</script>

<Card title="Collections">
	<CollectionList />
</Card>
