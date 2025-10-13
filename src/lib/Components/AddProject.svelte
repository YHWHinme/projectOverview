<script lang="ts">
  import * as lib from "$lib/lib";
  import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();
  
  export let clientId = 1; // Default client ID
  let name = "";
  
  async function addProject() {
    if (!name.trim()) return;
    const result = await lib.createProject(name, clientId);
    if (result === 200) {
      name = ""; // Clear input
      dispatch('add');
    } else {
      alert('Failed to add project');
    }
  }
</script>

<div class="add-project-form">
  <input 
    bind:value={name} 
    placeholder="Project name..." 
    class="add-project-input" 
    required 
  />
  <button on:click={addProject} class="add-project-btn">Add Project</button>
</div>

<style>
  .add-project-form {
    @apply flex items-start space-x-3 py-2 px-3 rounded-md bg-gray-50 border-b border-gray-100 ml-4 mb-1;
  }
  .add-project-input {
    @apply flex-1 px-3 py-1 text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500;
  }
  .add-project-btn {
    @apply px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors flex-shrink-0;
  }
</style>