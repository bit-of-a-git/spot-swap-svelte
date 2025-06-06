<script lang="ts">
  import { loggedInUser, currentCollection } from '$lib/runes.svelte';
  import { refreshCollectionState } from '$lib/services/collection-utils';
  import { spotswapService } from '$lib/services/spotswap-service';
  import Carousel from 'svelte-carousel';
  import { browser } from '$app/environment';

  // Initialises imageFile using $state for reactivity
  let imagefile = $state(null);

  // Uses $derived to create a reactive display name for the image file
  let imageDisplayName = $derived(
    imagefile && imagefile[0] ? imagefile[0].name : 'No File Selected'
  );

  // Takes the event object and updates the imagefile state
  function handleFileChange(event) {
    imagefile = event.target.files;
  }

  // This function is called after various actions. It fetches the collection and then calls another function to update the state.
  async function refresh() {
    const collection = await spotswapService.getCollectionById(
      currentCollection.collection._id,
      loggedInUser.token
    );
    if (collection) {
      await refreshCollectionState(collection);
    }
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

  async function deleteImage(spotId: string, index: number) {
    const success = await spotswapService.deleteImage(spotId, index, loggedInUser.token);
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
          <div class="column"><p>{spot.description}</p></div>
        </div>
        {#if spot.images?.length}
          <div class="columns is-multiline is-centered">
            <div class="column is-half">
              {#if browser}
                {#key spot.images}
                  <Carousel>
                    {#each spot.images as img, index (img)}
                      <div class="card-image">
                        <img src={img} alt="Image of {spot.name}" />
                        <button
                          class="button is-danger image-deletion-button"
                          aria-label={`Delete image of ${spot.name}`}
                          onclick={() => deleteImage(spot._id, index)}
                        >
                          <i class="fas fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    {/each}
                  </Carousel>
                {/key}
              {/if}
            </div>
          </div>
        {/if}
        <div class="subtitle">Upload New Image</div>
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
      </section>
    </div>
  {/each}
{:else}
  <div class="subtitle">No Spots</div>
{/if}
