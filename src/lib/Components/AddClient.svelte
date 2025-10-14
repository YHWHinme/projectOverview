<script lang="ts">
  import * as lib from "$lib/lib";
  import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();
  
  let name = "";
  
  async function addClient() {
    if (!name.trim()) return;
    const result = await lib.createClient(name);
    if (result === 200) {
      name = ""; // Clear input
      dispatch('add');
    } else {
      alert('Failed to add client');
    }
  }
</script>

<div class="add-client-form">
  <input 
    bind:value={name} 
    placeholder="Client name..." 
    class="add-client-input" 
    required 
  />
  <button on:click={addClient} class="add-client-btn">Add Client</button>
</div>

<style>
  .add-client-form {
    @apply flex items-start space-x-3 py-2 px-3 rounded-md bg-gray-50 border-b border-gray-100 ml-4 mb-1;
  }
  .add-client-input {
    @apply px-3 py-1 text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500;
  }
  .add-client-btn {
    @apply px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors flex-shrink-0;
  }
</style>