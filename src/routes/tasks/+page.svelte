<script lang="ts">
  import ProjectSection from '$lib/Components/ProjectSection.svelte';

  // Mock task data with Todoist-like structure
  let tasks = [
    {
      id: 1,
      text: "Review project proposals",
      completed: false,
      priority: "high",
      project: "Work",
      dueDate: "2024-01-15",
      labels: ["urgent", "review"]
    },
    {
      id: 2,
      text: "Update website documentation",
      completed: false,
      priority: "medium",
      project: "Website Redesign",
      dueDate: "2024-01-16",
      labels: ["documentation"]
    },
    {
      id: 3,
      text: "Call client about requirements",
      completed: true,
      priority: "high",
      project: "Mobile App Development",
      dueDate: "2024-01-14",
      labels: ["client", "meeting"]
    },
    {
      id: 4,
      text: "Set up development environment",
      completed: false,
      priority: "low",
      project: "API Integration",
      dueDate: null,
      labels: ["setup", "dev"]
    },
    {
      id: 5,
      text: "Design user interface mockups",
      completed: false,
      priority: "medium",
      project: "Mobile App Development",
      dueDate: "2024-01-18",
      labels: ["design", "ui"]
    },
    {
      id: 6,
      text: "Write API documentation",
      completed: false,
      priority: "medium",
      project: "API Integration",
      dueDate: "2024-01-20",
      labels: ["documentation", "api"]
    },
    {
      id: 7,
      text: "Test mobile responsiveness",
      completed: true,
      priority: "high",
      project: "Website Redesign",
      dueDate: "2024-01-12",
      labels: ["testing", "mobile"]
    }
  ];

  let newTaskText = "";
  let showCompleted = false;
  let newTaskProject = "Inbox";

  // Group tasks by project
  $: tasksByProject = tasks.reduce((acc, task) => {
    if (!acc[task.project]) {
      acc[task.project] = [];
    }
    acc[task.project].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  // Get sorted project names
  $: projectNames = Object.keys(tasksByProject).sort();

  // Get unique projects for dropdown
  $: projects = ["Inbox", ...new Set(tasks.map(task => task.project)).values()].filter(p => p !== "Inbox");

  function toggleTask(taskId: number) {
    tasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  function addTask() {
    if (newTaskText.trim()) {
      const newTask = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        text: newTaskText.trim(),
        completed: false,
        priority: "medium",
        project: newTaskProject,
        dueDate: null,
        labels: []
      };
      tasks = [...tasks, newTask];
      newTaskText = "";
    }
  }

  function deleteTask(taskId: number) {
    tasks = tasks.filter(task => task.id !== taskId);
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
        bind:value={newTaskProject}
        class="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      >
        <option value="Inbox">Inbox</option>
        {#each projects as project}
          <option value={project}>{project}</option>
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
      {tasks.length} total {tasks.length === 1 ? 'task' : 'tasks'} across {projectNames.length} {projectNames.length === 1 ? 'project' : 'projects'}
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
