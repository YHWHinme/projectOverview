<script lang="ts">
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
    }
  ];

  let newTaskText = "";
  let showCompleted = false;
  let selectedProject = "all";

  // Get unique projects
  $: projects = ["all", ...new Set(tasks.map(task => task.project))];
  
  // Filter tasks
  $: filteredTasks = tasks.filter(task => {
    if (!showCompleted && task.completed) return false;
    if (selectedProject !== "all" && task.project !== selectedProject) return false;
    return true;
  });

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
        project: selectedProject === "all" ? "Inbox" : selectedProject,
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

<svelte:head>
  <title>Tasks - Project Overseer</title>
</svelte:head>

<div class="max-w-4xl">
  <!-- Header -->
  <div class="mb-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Tasks</h1>
    <p class="text-gray-600 text-sm">Stay organized and get things done</p>
  </div>

  <!-- Add Task -->
  <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
    <div class="flex space-x-3">
      <input
        type="text"
        bind:value={newTaskText}
        placeholder="Add a task..."
        class="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
        on:keydown={(e) => e.key === 'Enter' && addTask()}
      />
      <button
        on:click={addTask}
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Add Task
      </button>
    </div>
  </div>

  <!-- Filters -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-4">
      <select
        bind:value={selectedProject}
        class="px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      >
        {#each projects as project}
          <option value={project}>{project === "all" ? "All Projects" : project}</option>
        {/each}
      </select>
      
      <label class="flex items-center text-sm">
        <input
          type="checkbox"
          bind:checked={showCompleted}
          class="mr-2 rounded"
        />
        Show completed
      </label>
    </div>

    <div class="text-sm text-gray-500">
      {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
    </div>
  </div>

  <!-- Tasks List -->
  <div class="space-y-2">
    {#each filteredTasks as task (task.id)}
      <div
        class="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow group"
        class:opacity-60={task.completed}
      >
        <div class="flex items-start space-x-3">
          <!-- Checkbox -->
          <button
            on:click={() => toggleTask(task.id)}
            class="mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors {getPriorityColor(task.priority)}"
            class:bg-red-500={task.completed}
            class:border-red-500={task.completed}
          >
            {#if task.completed}
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                on:click={() => deleteTask(task.id)}
                class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <!-- Task metadata -->
            <div class="flex items-center space-x-3 mt-2">
              <!-- Project -->
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {task.project}
              </span>

              <!-- Due date -->
              {#if task.dueDate}
                <span
                  class="text-xs px-2 py-1 rounded"
                  class:text-red-600={isOverdue(task.dueDate)}
                  class:bg-red-50={isOverdue(task.dueDate)}
                  class:text-gray-600={!isOverdue(task.dueDate)}
                  class:bg-gray-50={!isOverdue(task.dueDate)}
                >
                  {formatDate(task.dueDate)}
                </span>
              {/if}

              <!-- Labels -->
              {#each task.labels as label}
                <span class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  #{label}
                </span>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}

    {#if filteredTasks.length === 0}
      <div class="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div class="text-gray-400 text-4xl mb-4">✅</div>
        <h3 class="text-lg font-medium text-gray-700 mb-2">
          {showCompleted ? "No completed tasks" : "All done!"}
        </h3>
        <p class="text-gray-500">
          {showCompleted 
            ? "Complete some tasks to see them here" 
            : "Take a break, you've earned it"}
        </p>
      </div>
    {/if}
  </div>
</div>