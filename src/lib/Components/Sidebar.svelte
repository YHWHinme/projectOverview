<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard'},
    { path: '/projects', label: 'Projects'},
    { path: '/tasks', label: 'Tasks'}
  ];

  const bottomItems = [
    { path: '/settings', label: 'Settings'}
  ];

  function navigateTo(path: string) {
    goto(path);
  }

  // Reactive statement to determine active item based on current route
  $: currentPath = $page.url.pathname;
</script>

<div class="bg-gray-800 text-white w-64 h-screen flex flex-col">
  <!-- Logo -->
  <div class="p-4 border-b border-gray-700">
    <div class="flex items-center space-x-3">
      <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
        <span class="text-white font-bold text-xs">P</span>
      </div>
      <span class="text-white font-medium text-sm">Project Overseer</span>
    </div>
  </div>

  <!-- Main Navigation -->
  <nav class="flex-1 p-3">
    <ul class="space-y-2">
      {#each navigationItems as item}
        <li>
          <button
            class="w-full flex items-center px-2 py-1.5 rounded-md transition-colors duration-200 text-sm {currentPath === item.path
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
            on:click={() => navigateTo(item.path)}
          >
            <span>{item.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  </nav>

  <!-- Bottom Navigation -->
  <div class="px-3 pb-3">
    <!-- Minimal line break -->
    <div class="mx-2 mb-3 border-t border-gray-600"></div>
    <ul>
      {#each bottomItems as item}
        <li>
          <button
            class="w-full flex items-center px-2 py-1.5 rounded-md transition-colors duration-200 text-sm {currentPath === item.path
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
            on:click={() => navigateTo(item.path)}
          >
            <span>{item.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Footer -->
  <div class="p-4 border-t border-gray-700">
    <div class="text-xs text-gray-400">
      v0.1.0
    </div>
  </div>
</div>