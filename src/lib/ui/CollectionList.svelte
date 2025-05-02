<script lang="ts">
	import { userCollections } from '$lib/runes.svelte';
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Title</th>
			<th>County</th>
			<th>Spots</th>
		</tr>
	</thead>
	<tbody>
		{#each userCollections.collections as collection}
			<tr>
				<td>
					{collection.title}
				</td>
				<td>
					Co. {collection.county}
				</td>
				<td>
					<a
						href={`/collection/${collection._id}`}
						aria-label={`Open ${collection.title} collection`}
					>
						<i class="fas fa-folder-open"></i>
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
