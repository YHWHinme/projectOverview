<script lang="ts">
  import * as lib from "$lib/lib";
  import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();
  
  export let projectId: number;
  let title = "";
  
  async function addTask() {
    if (!title.trim()) return;
    const result = await lib.createTask(title, projectId);
    if (result === 200) {
      title = ""; // Clear input
      dispatch('add');
    } else {
      alert('Failed to add task');
    }
  }
</script>

<div class="add-task-form">
  <input 
    bind:value={title} 
    placeholder="Add a new task..." 
    class="add-task-input" 
    required 
  />
  <button on:click={addTask} class="add-task-btn">Add</button>
</div>

<style>
  .add-task-form {
    @apply flex items-start space-x-3 py-2 px-3 rounded-md bg-gray-50 border-b border-gray-100 ml-4 mb-1;
  }
  .add-task-input {
    @apply flex-1 px-3 py-1 text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500;
  }
  .add-task-btn {
    @apply px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors flex-shrink-0;
  }
</style>