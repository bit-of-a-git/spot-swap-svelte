<script lang="ts">
	import { enhance } from '$app/forms';
	import { categoryList } from '$lib/constants';

	let { enhanceFn, message = $bindable('') } = $props();

	// Geolocation function
	// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
	function geoFindMe() {
		const status = document.querySelector('#geo-status');

		function success(position: GeolocationPosition) {
			const latitude = position.coords.latitude.toFixed(6); // Update latitude directly
			const longitude = position.coords.longitude.toFixed(6); // Update longitude directly

			if (status) {
				status.textContent = '';
			}

			updateInputs(latitude, longitude);
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

	function updateInputs(lat: string, lng: string) {
		const latInput = document.querySelector<HTMLInputElement>('#latitude');
		const lngInput = document.querySelector<HTMLInputElement>('#longitude');
		if (latInput && lngInput) {
			latInput.value = lat;
			lngInput.value = lng;
		}
	}
</script>

<form method="POST" action="?/addSpot" use:enhance={enhanceFn}>
	<div class="columns">
		<div class="column is-half">
			<div class="field">
				<label class="label" for="name">Name</label>
				<input class="input" id="name" name="name" type="text" placeholder="Enter spot name" />
			</div>
		</div>
		<div class="column is-half">
			<div class="field">
				<label class="label" for="category">Category</label>
				<div class="select">
					<select name="category" required>
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
					required
				/>
			</div>
		</div>
		<div class="column is-one-third align-bottom">
			<div class="field">
				<p id="geo-status" class="has-text-white-ter"></p>
				<button onclick={() => geoFindMe()} class="button is-info" type="button"
					>Use current location</button
				>
			</div>
		</div>
	</div>
	<div class="field">
		<div class="control">
			<button class="button is-success">Add Spot</button>
		</div>
	</div>
</form>
{#if message}
	<div class="box mt-4">
		<div class="content has-text-centered">
			{message}
		</div>
	</div>
{/if}
