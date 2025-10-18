<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TaskItem from './TaskItem.svelte';

  export let project: string;
  export let tasks: Array<{
    id: number;
    title: string;
    completed: boolean;
    priority: string;
    project: string;
    dueDate: string | null;
    labels: string[];
  }>;
  export let showCompleted: boolean = false;

  const dispatch = createEventDispatcher();
  let isCollapsed = false;

  // Filter tasks based on showCompleted flag
  $: filteredTasks = tasks.filter(task => showCompleted || !task.completed);
  $: visibleTasksCount = filteredTasks.length;
  $: completedTasksCount = tasks.filter(task => task.completed).length;

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }

  function handleTaskToggle(event: any) {
    dispatch('task-toggle', event.detail);
  }

  function handleTaskDelete(event: any) {
    dispatch('task-delete', event.detail);
  }

  function handleTaskRename(event: any) {
    dispatch('task-rename', event.detail);
  }

  function handleTaskViewDetails(event: any) {
    dispatch('task-view-details', event.detail);
  }
</script>

<div class="mb-6">
  <!-- Project Header -->
  <div class="flex items-center justify-between mb-3">
    <button 
      class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
      on:click={toggleCollapse}
    >
      <!-- Collapse/Expand Icon -->
      <svg 
        class="w-4 h-4 transition-transform duration-200 {isCollapsed ? '' : 'rotate-90'}" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      
      <!-- Project Name -->
      <h3 class="text-lg font-semibold">📁 {project}</h3>
    </button>

    <!-- Task Counts -->
    <div class="flex items-center space-x-2 text-sm text-gray-500">
      {#if completedTasksCount > 0}
        <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
          {completedTasksCount} completed
        </span>
      {/if}
      <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
        {visibleTasksCount} {visibleTasksCount === 1 ? 'task' : 'tasks'}
      </span>
    </div>
  </div>

  <!-- Tasks List -->
  {#if !isCollapsed}
    <div class="border-l-2 border-gray-200 ml-2">
      {#if filteredTasks.length > 0}
        {#each filteredTasks as task (task.id)}
          <TaskItem
            {task}
            on:toggle={handleTaskToggle}
            on:delete={handleTaskDelete}
            on:rename={handleTaskRename}
            on:view-details={handleTaskViewDetails}
          />
        {/each}
      {:else}
        <div class="ml-4 py-4 text-gray-500 text-sm">
          {tasks.length === 0 
            ? "No tasks in this project yet" 
            : "All tasks completed! 🎉"}
        </div>
      {/if}
    </div>
  {/if}
</div>