<script lang="ts">
  import { enhance } from '$app/forms';
  import { categoryList } from '$lib/constants';
  import Message from '$lib/ui/Message.svelte';

  let { enhanceFn, message = $bindable('') } = $props();

  let latitude = $state();
  let longitude = $state();

  let geoStatusMessage = $state('');

  // Geolocation function
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
  function geoFindMe() {
    function success(position: GeolocationPosition) {
      latitude = parseFloat(position.coords.latitude.toFixed(6)); // Update latitude directly
      longitude = parseFloat(position.coords.longitude.toFixed(6)); // Update longitude directly
      geoStatusMessage = ''; // Update reactive variable
    }

    function error() {
      geoStatusMessage = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
      geoStatusMessage = 'Geolocation is not supported by your browser';
    } else {
      geoStatusMessage = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
</script>

<form method="POST" action="?/addSpot" use:enhance={enhanceFn}>
  <div class="columns">
    <div class="column is-half">
      <div class="field">
        <label class="label" for="name">Name</label>
        <input
          class="input"
          id="name"
          name="name"
          type="text"
          placeholder="Enter spot name"
          required
        />
      </div>
    </div>
    <div class="column is-half">
      <div class="field">
        <label class="label" for="category">Category</label>
        <div class="select">
          <select name="category" required>
            <option value="" disabled selected>Select a category</option>
            {#each categoryList as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-full">
      <div class="field">
        <label class="label" for="description">Description</label>
        <input
          class="input"
          id="description"
          name="description"
          type="text"
          placeholder="Enter Description"
          required
        />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-one-third">
      <div class="field">
        <label class="label" for="latitude">Latitude</label>
        <input
          class="input"
          id="latitude"
          type="number"
          placeholder="00.00"
          name="latitude"
          step="0.000001"
          min="-90"
          max="90"
          bind:value={latitude}
          required
        />
      </div>
    </div>
    <div class="column is-one-third">
      <div class="field">
        <label class="label" for="longitude">Longitude</label>
        <input
          class="input"
          id="longitude"
          type="number"
          placeholder="00.00"
          name="longitude"
          step="0.000001"
          min="-180"
          max="180"
          bind:value={longitude}
          required
        />
      </div>
    </div>
    <div class="column is-one-third align-bottom">
      <label class="label has-text-info">{geoStatusMessage}</label>
      <button onclick={() => geoFindMe()} class="button is-info" type="button"
        >Use current location</button
      >
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-success">Add Spot</button>
    </div>
  </div>
</form>
{#if message}
  <div class="mt-3">
    <Message {message} />
  </div>
{/if}
