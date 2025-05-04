<script lang="ts">
	import { loggedInUser } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';
	import type { Spot } from '$lib/types/collection-types.ts';
	import { categoryList } from '$lib/constants';

	let name = $state('');
	let description = $state('');
	let selectedCategory = $state('');
	let latitude = $state(0);
	let longitude = $state(0);
	let message = $state('Please add a collection');

	let { id, spotEvent = null } = $props();

	async function addSpot() {
		const spot: Spot = {
			name: name,
			description: description,
			category: selectedCategory,
			latitude: latitude,
			longitude: longitude
		};
		const success = await spotswapService.addSpot(id, spot, loggedInUser.token);
		if (!success) {
			message = 'Failed to add spot - an error occurred';
			return;
		}
		if (spotEvent) {
			spotEvent(spot);
			message = `You added ${name} spot to ${selectedCategory}`;
		}
	}

	// Geolocation function
	// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
	function geoFindMe() {
		const status = document.querySelector('#geo-status');

		function success(position: GeolocationPosition) {
			latitude = parseFloat(position.coords.latitude.toFixed(6)); // Update latitude directly
			longitude = parseFloat(position.coords.longitude.toFixed(6)); // Update longitude directly

			if (status) {
				status.textContent = '';
			}
		}

		function error() {
			if (status) {
				status.textContent = 'Unable to retrieve your location';
			}
		}

		if (!navigator.geolocation) {
			if (status) {
				status.textContent = 'Geolocation is not supported by your browser';
			}
		} else {
			if (status) {
				status.textContent = 'Locating…';
			}
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}
</script>

<div class="columns">
	<div class="column is-one-third">
		<div class="field">
			<label class="label" for="title">Name</label>
			<input
				bind:value={name}
				class="input"
				id="name"
				name="name"
				type="text"
				placeholder="Enter spot name"
			/>
		</div>
	</div>
	<div class="column is-one-third">
		<div class="field">
			<label class="label" for="county">Description</label>
			<input
				bind:value={description}
				class="input"
				type="text"
				placeholder="Enter Description"
				name="description"
			/>
		</div>
	</div>
	<div class="column is-one-third">
		<div class="field">
			<label class="label" for="category">Category</label>
			<div class="select">
				<select bind:value={selectedCategory} required>
					{#each categoryList as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</div>
<div class="columns">
	<div class="column is-one-third">
		<div class="field">
			<label class="label has-text-white-ter">Latitude</label>
			<input
				bind:value={latitude}
				class="input"
				id="latitude"
				type="number"
				placeholder="00.00"
				name="latitude"
				step="0.000001"
				min="-90"
				max="90"
				required
			/>
		</div>
	</div>
	<div class="column is-one-third">
		<div class="field">
			<label class="label has-text-white-ter">Longitude</label>
			<input
				bind:value={longitude}
				class="input"
				id="longitude"
				type="number"
				placeholder="00.00"
				name="longitude"
				step="0.000001"
				min="-180"
				max="180"
				required
			/>
		</div>
	</div>
	<div class="column is-one-third align-bottom">
		<div class="field">
			<p id="geo-status" class="has-text-white-ter"></p>
			<button onclick={() => geoFindMe()} class="button is-info" type="button"
				>Use my current location</button
			>
		</div>
	</div>
</div>
<div class="field">
	<div class="control">
		<button onclick={() => addSpot()} class="button is-success">Add</button>
	</div>
</div>
