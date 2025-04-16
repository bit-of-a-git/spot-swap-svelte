<script lang="ts">
	const countyList = [
		'Antrim',
		'Armagh',
		'Carlow',
		'Cavan',
		'Clare',
		'Cork',
		'Derry',
		'Donegal',
		'Down',
		'Dublin',
		'Fermanagh',
		'Galway',
		'Kerry',
		'Kildare',
		'Kilkenny',
		'Laois',
		'Leitrim',
		'Limerick',
		'Longford',
		'Louth',
		'Mayo',
		'Meath',
		'Monaghan',
		'Offaly',
		'Roscommon',
		'Sligo',
		'Tipperary',
		'Tyrone',
		'Waterford',
		'Westmeath',
		'Wexford',
		'Wicklow'
	];

	let title = $state(0);
	let selectedCounty = $state('Galway');

	async function addCollection() {
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
