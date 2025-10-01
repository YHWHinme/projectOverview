<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Redirect to dashboard on page load
  onMount(() => {
    goto('/dashboard');
  });
</script>

<svelte:head>
  <title>Project Overseer</title>
</svelte:head>

<!-- This page will automatically redirect to dashboard -->
<div class="max-w-4xl">
  <div class="bg-white rounded-lg shadow-md p-8 text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
    <p class="text-gray-600">Loading Project Overseer...</p>
  </div>
</div>
