<script lang="ts">
	let { collections } = $props();
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Title</th>
			<th>County</th>
		</tr>
	</thead>
	<tbody>
		{#each collections as collection}
			<tr>
				<td>
					{collection.title}
				</td>
				<td>
					{collection.county}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
