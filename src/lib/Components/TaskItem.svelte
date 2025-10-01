<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let task: {
    id: number;
    text: string;
    completed: boolean;
    priority: string;
    project: string;
    dueDate: string | null;
    labels: string[];
  };

  const dispatch = createEventDispatcher();

  function toggleTask() {
    dispatch('toggle', task.id);
  }

  function deleteTask() {
    dispatch('delete', task.id);
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case "high": return "text-red-500 border-red-500";
      case "medium": return "text-yellow-500 border-yellow-500";
      case "low": return "text-green-500 border-green-500";
      default: return "text-gray-500 border-gray-500";
    }
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString();
  }

  function isOverdue(dateStr: string | null) {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  }
</script>

<div
  class="flex items-start space-x-3 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors group ml-4"
  class:opacity-60={task.completed}
>
  <!-- Checkbox -->
  <button
    on:click={toggleTask}
    class="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors {getPriorityColor(task.priority)} flex-shrink-0"
    class:bg-red-500={task.completed}
    class:border-red-500={task.completed}
  >
    {#if task.completed}
      <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    {/if}
  </button>

  <!-- Task Content -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center justify-between">
      <p
        class="text-gray-800 text-sm"
        class:line-through={task.completed}
        class:text-gray-500={task.completed}
      >
        {task.text}
      </p>
      
      <!-- Delete button (shows on hover) -->
      <button
        on:click={deleteTask}
        class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 flex-shrink-0"
      >
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Task metadata -->
    <div class="flex items-center space-x-2 mt-1">
      <!-- Due date -->
      {#if task.dueDate}
        <span
          class="text-xs px-1.5 py-0.5 rounded"
          class:text-red-600={isOverdue(task.dueDate)}
          class:bg-red-50={isOverdue(task.dueDate)}
          class:text-gray-600={!isOverdue(task.dueDate)}
          class:bg-gray-100={!isOverdue(task.dueDate)}
        >
          {formatDate(task.dueDate)}
        </span>
      {/if}

      <!-- Labels -->
      {#each task.labels as label}
        <span class="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
          #{label}
        </span>
      {/each}
    </div>
  </div>
</div>