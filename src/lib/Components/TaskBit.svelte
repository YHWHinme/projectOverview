<script lang="ts">
  export let id: number;
  export let title: string;
  export let projectId: number;
</script>

<div class="flex items-start space-x-3 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors group ml-4">
  <!-- Placeholder for future checkbox -->
  <div class="mt-0.5 w-4 h-4 flex-shrink-0"></div>

  <!-- Task Content -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center justify-between">
      <p class="text-gray-800 text-sm">
        {title}
      </p>
    </div>

    <!-- Task metadata -->
    <div class="flex items-center space-x-2 mt-1">
      <span class="text-xs text-gray-500">Project {projectId}</span>
    </div>
  </div>
</div>