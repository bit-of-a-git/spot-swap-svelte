<script lang="ts">
	export let collections = [
		{
			title: 'Best views in Sligo',
			user: 'bart@simpson.com'
		},
		{
			title: 'Quiet Man spots in Cong',
			user: 'marge@simpson.com'
		},
		{
			title: 'Titanic locations in Belfast',
			user: 'homer@simpson.com'
		}
	];
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Title</th>
			<th>User</th>
		</tr>
	</thead>
	<tbody>
		{#each collections as collection}
			<tr>
				<td>
					{collection.title}
				</td>
				<td>
					{collection.user}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
