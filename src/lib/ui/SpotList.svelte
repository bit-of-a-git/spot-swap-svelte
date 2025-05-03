<script lang="ts">
	import { loggedInUser } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';

	let { collection } = $props();

	async function deleteSpot(spotId: string) {
		const success = await spotswapService.deleteSpot(spotId, loggedInUser.token);
	}
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Name</th>
			<th>Category</th>
			<th>Description</th>
			<th>Lat</th>
			<th>Long</th>
			<th>Delete</th>
		</tr>
	</thead>
	<tbody>
		{#each collection.spots as spot}
			<tr>
				<td>
					{spot.name}
				</td>
				<td>
					{spot.category}
				</td>
				<td>
					{spot.description}
				</td>
				<td>
					{spot.latitude}
				</td>
				<td>
					{spot.longitude}
				</td>
				<td>
					<a aria-label={`Delete ${spot.name} spot`} on:click={() => deleteSpot(spot._id)}>
						<i class="fas fa-trash" aria-hidden="true"></i>
					</a></td
				>
			</tr>
		{/each}
	</tbody>
</table>
