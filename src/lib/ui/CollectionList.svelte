<script lang="ts">
	import { userCollections, loggedInUser } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';

	async function deleteCollection(collectionId: string) {
		await spotswapService.deleteCollection(collectionId, loggedInUser.token);
	}
</script>

{#if userCollections.collections.length === 0}
	<p class="has-text-centered">No collections found.</p>
{:else}
	<table class="table is-fullwidth">
		<thead>
			<tr>
				<th>Title</th>
				<th class="county-column">County</th>
				<th class="actions-column">Actions</th>
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
							<i class="button is-small is-info fas fa-folder-open is-pulled-left"></i>
						</a>
						<button
							type="button"
							aria-label={`Delete ${collection.title} collection`}
							on:click={() => deleteCollection(collection._id)}
							class="button is-small is-danger is-pulled-right"
						>
							<i class="fas fa-trash" aria-hidden="true"></i>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
