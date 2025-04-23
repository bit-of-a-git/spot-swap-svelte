<script lang="ts">
	let { collection } = $props();
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Name</th>
			<th>Category</th>
			<th>Description</th>
			<th>Lat</th>
			<th>Long</th>
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
			</tr>
		{/each}
	</tbody>
</table>
