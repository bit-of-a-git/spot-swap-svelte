<script lang="ts">
	import { loggedInUser } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';
	import LeafletMap from './LeafletMap.svelte';

	let map: LeafletMap;

	let { collection, showButtons } = $props();

	let imagefile = $state(null);

	let imageDisplayName = $derived(
		imagefile && imagefile[0] ? imagefile[0].name : 'No File Selected'
	);

	function handleFileChange(event) {
		imagefile = event.target.files;
	}

	async function deleteSpot(spotId: string) {
		const success = await spotswapService.deleteSpot(spotId, loggedInUser.token);
	}

	async function uploadImage(spotId: string) {
		const file = imagefile[0];
		if (file) {
			const formData = new FormData();
			formData.append('imagefile', file);
			const success = await spotswapService.uploadImage(spotId, formData, loggedInUser.token);
			if (success) {
			}
		}
	}

	async function deleteImage(spotId: string) {
		const success = await spotswapService.deleteImage(spotId, loggedInUser.token);
	}
</script>

{#if collection.spots.length}
	{#each collection.spots as spot}
		<div class="box">
			<section class="section">
				<div class="title">{spot.name}</div>
				<div class="subtitle is-6 has-text-warning">{spot.category}</div>
				<div class="columns">
					<div class="column">{spot.description}</div>
				</div>
				{#if spot.img}
					<div class="columns is-centered">
						<div class="column is-two-thirds">
							<div class="card-image">
								<figure class="image is-256x256">
									<img src={spot.img} alt="Picture of {spot.name}" />
									{#if showButtons}
										<a
											class="button is-danger image-deletion-button"
											aria-label={`Delete ${spot.name} image`}
											on:click={() => deleteImage(spot._id)}
										>
											<i class="fas fa-trash" aria-hidden="true"></i>
										</a>
									{/if}
								</figure>
							</div>
						</div>
					</div>
				{:else if showButtons}
					<div class="subtitle">Upload Image</div>
					<div id="file-select" class="file has-name is-fullwidth">
						<label class="file-label">
							<input
								class="file-input"
								name="imagefile"
								type="file"
								accept="image/png, image/jpeg"
								on:change={handleFileChange}
							/>
							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload"></i>
								</span>
								<span class="file-label">Choose a file…</span>
							</span>
							<span class="file-name"> {imageDisplayName}</span>
						</label>
						<button type="submit" class="button is-link" on:click={() => uploadImage(spot._id)}>
							Upload
						</button>
					</div>
				{/if}
				{#if showButtons}
					<!-- Always show the deleteSpot button if showButtons is true -->
					<a
						class="button is-danger is-pulled-right"
						aria-label={`Delete ${spot.name}`}
						on:click={() => deleteSpot(spot._id)}
					>
						<i class="fas fa-trash" aria-hidden="true"></i>
					</a>
				{/if}
			</section>
		</div>
	{/each}
{:else}
	<div class="subtitle">No Spots</div>
{/if}
