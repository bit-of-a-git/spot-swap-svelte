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

	let { id } = $props();

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
		message = `You added ${name} spot to ${selectedCategory}`;
	}
</script>

<div class="field is-horizontal">
	<div class="field-body">
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
</div>
<div class="field">
	<div class="control">
		<button onclick={() => addSpot()} class="button is-success is-fullwidth">Add Spot</button>
	</div>
</div>
