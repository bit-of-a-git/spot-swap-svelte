<script lang="ts">
	import { userCollections, loggedInUser } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';

	async function deleteCollection(collectionId: string) {
		await spotswapService.deleteCollection(collectionId, loggedInUser.token);
	}
</script>

{#if userCollections.collections.length === 0}
	<div class="box">
		<p class="has-text-centered">No collections found.</p>
	</div>
{:else}
	<table class="table is-fullwidth">
		<thead>
			<tr>
				<th>Title</th>
				<th>County</th>
				<th>Actions</th>
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
							<i class="fas fa-folder-open is-pulled-left"></i>
						</a>
						<a
							aria-label={`Delete ${collection.title} collection`}
							on:click={() => deleteCollection(collection._id)}
						>
							<i class="fas fa-trash is-pulled-right" aria-hidden="true"></i>
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
