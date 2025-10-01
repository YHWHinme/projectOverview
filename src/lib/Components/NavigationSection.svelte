<script lang="ts">
  import NavigationItem from './NavigationItem.svelte';

  export let items: Array<{ path: string; label: string; icon?: string }>;
  export let className: string = '';
</script>

<nav class={className}>
  <ul class="space-y-2">
    {#each items as item}
      <NavigationItem 
        path={item.path} 
        label={item.label} 
        icon={item.icon || ''} 
      />
    {/each}
  </ul>
</nav>