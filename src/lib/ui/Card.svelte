<script lang="ts">
  // Additionally takes an icon prop to allow further customisation
  let { title = '', children, icon = 'fas fa-coins' } = $props();
</script>

<div class="card mb-5">
  <header class="card-header">
    <p class="card-header-title">
      <span class="icon"><i class={icon}></i></span><span>{title}</span>
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      {@render children()}
    </div>
  </div>
</div>
