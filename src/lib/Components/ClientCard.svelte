<script lang="ts">
  export let client: {
    id: number;
    name: string;
    projectNumber: number;
  };
</script>

<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <!-- Client Header -->
  <div class="flex justify-between items-start mb-4">
    <h3 class="text-lg font-semibold text-gray-800">{client.name}</h3>
    <span class="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
      {client.projectNumber} {client.projectNumber === 1 ? 'project' : 'projects'}
    </span>
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