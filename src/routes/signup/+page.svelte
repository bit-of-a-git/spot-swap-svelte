<script lang="ts">
	import SignupForm from './SignupForm.svelte';
</script>

<section class="hero is-fullheight is-default is-bold">
	<div class="hero-head"></div>
	<div class="hero-body">
		<div class="container">
			<div class="columns is-vcentered">
				<div class="column is-5">
					<h1 class="title has-text-centered">Sign up to SpotSwap</h1>
					<SignupForm />
				</div>
				<div class="column is-5 is-offset-1">
					<figure class="image">
						<img class="object-fit" src="/globe.jpg" alt="globe" />
					</figure>
				</div>
			</div>
		</div>
	</div>
</section>
