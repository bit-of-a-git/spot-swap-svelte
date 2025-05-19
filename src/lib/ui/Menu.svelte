<script lang="ts">
	import { loggedInUser } from '$lib/runes.svelte';
</script>

<nav class="navbar is-full-width">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item title p-3" href="/dashboard">
				<i class="fa-solid fa-earth-europe spotswap-icon" aria-hidden="true"></i>
				<div class="title ml-4">SpotSwap</div>
			</a>
		</div>
		<div id="navbarMenu" class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="/dashboard"> Dashboard </a>
				<a class="navbar-item" href="/analytics"> Analytics </a>
				<a class="navbar-item" href="/spots"> Spots </a>
				<a data-sveltekit-preload-data="tap" class="navbar-item" href="/logout">
					Log Out [{loggedInUser.name}]</a
				>
			</div>
			<div></div>
		</div>
	</div>
</nav>
