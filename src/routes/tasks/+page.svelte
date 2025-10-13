<script lang="ts">
  import ProjectSection from '$lib/Components/ProjectSection.svelte';
  import * as lib from "../../lib/lib";
  import { onMount } from "svelte";

  let dbTasks: lib.Tasks[] = [];
  let projects: lib.Projects[] = [];
  let newTaskText = "";
  let showCompleted = false;
  let selectedProjectId: number = 0;

  // Adapted tasks for ProjectSection
  $: adaptedTasks = dbTasks.map(task => {
    const project = projects.find(p => p.id === task.project_id);
    return {
      id: task.id,
      text: task.title,
      completed: task.complete === 1,
      priority: "medium", // default
      project: project ? project.name : "Unknown",
      dueDate: null,
      labels: []
    };
  });

  // Group adapted tasks by project name
  $: tasksByProject = adaptedTasks.reduce((acc, task) => {
    if (!acc[task.project]) {
      acc[task.project] = [];
    }
    acc[task.project].push(task);
    return acc;
  }, {} as Record<string, typeof adaptedTasks>);

  // Get sorted project names
  $: projectNames = Object.keys(tasksByProject).sort();

  async function loadData() {
    dbTasks = await lib.getTasks();
    projects = await lib.getProjects();
    if (projects.length > 0 && selectedProjectId === 0) {
      selectedProjectId = projects[0].id;
    }
  }

  onMount(loadData);

  function toggleTask(taskId: number) {
    // Note: This is UI only, DB update would need backend command
    adaptedTasks = adaptedTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  async function addTask() {
    if (newTaskText.trim() && selectedProjectId !== 0) {
      const result = await lib.createTask(newTaskText.trim(), selectedProjectId);
      if (result === 200) {
        newTaskText = "";
        loadData(); // Reload to show new task
      } else {
        alert('Failed to add task');
      }
    }
  }

  async function deleteTask(taskId: number) {
    const result = await lib.deleteTask(taskId);
    if (result === 200) {
      loadData(); // Reload to remove deleted task
    } else {
      alert('Failed to delete task');
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  }
</script>

<svelte:head>
  <title>Tasks - Project Overseer</title>
</svelte:head>

<div class="max-w-5xl">
  <!-- Header -->
  <div class="mb-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Tasks</h1>
    <p class="text-gray-600 text-sm">Organize your tasks by project</p>
  </div>

  <!-- Add Task -->
  <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
    <div class="flex space-x-3">
      <input
        type="text"
        bind:value={newTaskText}
        placeholder="Add a task..."
        class="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
        on:keydown={handleKeydown}
      />
      <select
        bind:value={selectedProjectId}
        class="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      >
        {#each projects as project}
          <option value={project.id}>{project.name}</option>
        {/each}
      </select>
      <button
        on:click={addTask}
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Add Task
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-4">
      <label class="flex items-center text-sm">
        <input
          type="checkbox"
          bind:checked={showCompleted}
          class="mr-2 rounded"
        />
        Show completed tasks
      </label>
    </div>

    <div class="text-sm text-gray-500">
      {adaptedTasks.length} total {adaptedTasks.length === 1 ? 'task' : 'tasks'} across {projectNames.length} {projectNames.length === 1 ? 'project' : 'projects'}
    </div>
  </div>

  <!-- Project Tree View -->
  <div class="bg-white rounded-lg shadow-sm border p-6">
    {#if projectNames.length > 0}
      {#each projectNames as projectName (projectName)}
        <ProjectSection 
          project={projectName}
          tasks={tasksByProject[projectName]}
          {showCompleted}
          on:task-toggle={(e) => toggleTask(e.detail)}
          on:task-delete={(e) => deleteTask(e.detail)}
        />
      {/each}
    {:else}
      <div class="text-center py-12">
        <div class="text-gray-400 text-4xl mb-4">📋</div>
        <h3 class="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
        <p class="text-gray-500">Add your first task to get started</p>
      </div>
    {/if}
  </div>
</div>
