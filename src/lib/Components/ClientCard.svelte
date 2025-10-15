<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let client: {
    id: number;
    name: string;
    projectNumber: number;
  };

  const dispatch = createEventDispatcher();

  function deleteClient() {
    dispatch('delete', client.id);
  }
</script>

<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group">
  <!-- Client Header -->
  <div class="flex justify-between items-start mb-4">
    <h3 class="text-lg font-semibold text-gray-800">{client.name}</h3>
    <div class="flex items-center space-x-2">
      <span class="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
        {client.projectNumber} {client.projectNumber === 1 ? 'project' : 'projects'}
      </span>

      <!-- Delete button -->
      <button
        on:click={deleteClient}
        class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 flex-shrink-0"
      >
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Client Description (placeholder) -->
  <p class="text-gray-600 text-sm mb-4">Client details and information will be displayed here.</p>

  <!-- Action Buttons -->
  <div class="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
    <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-xs font-medium transition-colors">
      View Details
    </button>
    <button class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded text-xs font-medium transition-colors">
      Edit Client
    </button>
  </div>
</div>