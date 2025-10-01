<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let path: string;
  export let label: string;
  export let icon: string = '';

  function navigateTo() {
    goto(path);
  }

  // Reactive statement to determine if this item is active
  $: isActive = $page.url.pathname === path;
</script>

<li>
  <button
    class="w-full flex items-center px-2 py-1.5 rounded-md transition-colors duration-200 text-sm {isActive
      ? 'bg-blue-600 text-white'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
    on:click={navigateTo}
  >
    {#if icon}
      <span class="mr-2">{icon}</span>
    {/if}
    <span>{label}</span>
  </button>
</li>