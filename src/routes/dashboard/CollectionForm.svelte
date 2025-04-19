<script lang="ts">
	import { loggedInUser } from '$lib/runes.svelte';
	import { spotswapService } from '$lib/services/spotswap-service';
	import type { Collection } from '$lib/types/collection-types.ts';
	import { countyList } from '$lib/constants/counties';

	let title = $state('');
	let selectedCounty = $state('');
	let message = $state('Please add a collection');

	async function addCollection() {
		if (title && selectedCounty) {
			const collection: Collection = {
				title: title,
				county: selectedCounty
			};
			const success = await spotswapService.addCollection(collection, loggedInUser.token);
			if (!success) {
				message = 'Failed to add collection - an error occurred';
				return;
			}
			message = `You added the ${title} collection in Co. ${selectedCounty}`;
		} else {
			message = 'Please fill in all fields';
		}
		console.log(`Just added collection: ${title} to ${selectedCounty}`);
		// console.log(`lat: ${lat}, lng: ${lng}`);
	}
</script>

<div class="field is-horizontal">
	<div class="field-body">
		<div class="field">
			<label class="label" for="title">Collection Name:</label>
			<input
				bind:value={title}
				class="input"
				id="title"
				name="title"
				type="text"
				placeholder="Enter collection name"
			/>
		</div>
		<div class="field">
			<label class="label" for="county">County</label>
			<div class="select">
				<select bind:value={selectedCounty}>
					<option value="" selected>All Counties</option>
					{#each countyList as county}
						<option value={county}>Co. {county}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</div>
<div class="field">
	<div class="control">
		<button onclick={() => addCollection()} class="button is-success is-fullwidth"
			>Add Collection</button
		>
	</div>
</div>
