<script lang="ts">
	import { loggedInUser, currentCollection } from '$lib/runes.svelte';
	import { refreshCollectionState } from '$lib/services/collection-utils';
	import { spotswapService } from '$lib/services/spotswap-service';

	let imagefile = $state(null);

	let imageDisplayName = $derived(
		imagefile && imagefile[0] ? imagefile[0].name : 'No File Selected'
	);

	function handleFileChange(event) {
		imagefile = event.target.files;
	}

	async function refresh() {
		const collectionId = currentCollection.collection._id;
		const collection = await spotswapService.getCollectionById(collectionId, loggedInUser.token);
		await refreshCollectionState(collection);
	}

	async function deleteSpot(spotId: string) {
		const success = await spotswapService.deleteSpot(spotId, loggedInUser.token);
		if (success) {
			await refresh();
		}
	}

	async function uploadImage(spotId: string) {
		const file = imagefile[0];
		if (file) {
			const formData = new FormData();
			formData.append('imagefile', file);
			const success = await spotswapService.uploadImage(spotId, formData, loggedInUser.token);
			if (success) {
				await refresh();
			}
		}
	}

	async function deleteImage(spotId: string) {
		const success = await spotswapService.deleteImage(spotId, loggedInUser.token);
		if (success) {
			await refresh();
		}
	}
</script>

{#if currentCollection.collection.spots?.length}
	{#each [...currentCollection.collection.spots].reverse() as spot}
		<div class="box">
			<section class="section">
				<button
					class="button is-danger is-pulled-right"
					aria-label={`Delete ${spot.name}`}
					onclick={() => deleteSpot(spot._id)}
				>
					<i class="fas fa-trash" aria-hidden="true"></i>
				</button>
				<div class="title">{spot.name}</div>
				<div class="subtitle is-6 has-text-warning">{spot.category}</div>
				<div class="columns">
					<div class="column">{spot.description}</div>
				</div>
				{#if spot.img}
					<div class="columns is-centered">
						<div class="column is-half">
							<div class="card-image">
								<figure class="image is-256x256">
									<img src={spot.img} alt="Picture of {spot.name}" />
									<button
										class="button is-danger image-deletion-button"
										aria-label={`Delete ${spot.name} image`}
										onclick={() => deleteImage(spot._id)}
									>
										<i class="fas fa-trash" aria-hidden="true"></i>
									</button>
								</figure>
							</div>
						</div>
					</div>
				{:else}
					<div class="subtitle">Upload Image</div>
					<div id="file-select" class="file has-name is-fullwidth">
						<label class="file-label">
							<input
								class="file-input"
								name="imagefile"
								type="file"
								accept="image/png, image/jpeg"
								onchange={handleFileChange}
							/>
							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload"></i>
								</span>
								<span class="file-label">Choose a file…</span>
							</span>
							<span class="file-name"> {imageDisplayName}</span>
						</label>
						<button type="submit" class="button is-link" onclick={() => uploadImage(spot._id)}>
							Upload
						</button>
					</div>
				{/if}
			</section>
		</div>
	{/each}
{:else}
	<div class="subtitle">No Spots</div>
{/if}
