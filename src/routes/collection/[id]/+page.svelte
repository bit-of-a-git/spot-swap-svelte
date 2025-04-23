<script lang="ts">
	import { subTitle } from '$lib/runes.svelte.js';
	import Card from '$lib/ui/Card.svelte';
	import SpotList from '$lib/ui/SpotList.svelte';
	import SpotForm from './SpotForm.svelte';

	export let data;

	subTitle.text = data.title;
</script>

<Card title="Collection">
	<SpotList collection={data} />
</Card>

<Card title="Add Spot">
	<SpotForm id={data._id} />
</Card>
