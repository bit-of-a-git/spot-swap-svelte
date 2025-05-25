<script lang="ts">
	import { enhance } from '$app/forms';
	import { countyList } from '$lib/constants';

	let { enhanceFn, message = $bindable('') } = $props();
</script>

<form method="POST" action="?/addCollection" use:enhance={enhanceFn}>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<label class="label" for="title">Collection Name:</label>
				<input
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
					<select name="county" required>
						<option value="" disabled selected>Select a county</option>
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
			<button class="button is-success is-fullwidth">Add Collection</button>
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
