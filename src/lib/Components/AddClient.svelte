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

<form class="add-client-form" on:submit|preventDefault={addClient}>
  <input
    bind:value={name}
    placeholder="Client name..."
    class="add-client-input"
    required
  />
  <button type="submit" class="add-client-btn">Add Client</button>
</form>

<style>
  .add-client-form {
    @apply flex items-start space-x-3 py-2 px-3 rounded-md bg-app-secondary border-b border-app-text-secondary ml-4 mb-1;
  }
  .add-client-input {
    @apply px-3 py-1 text-sm text-app-text-primary border border-app-text-secondary rounded focus:outline-none focus:ring-1 focus:ring-app-accent-primaryAccent;
  }
  .add-client-btn {
    @apply px-3 py-1 bg-app-accent-primaryAccent text-app-background text-sm rounded hover:bg-app-accent-secondaryAccent transition-colors flex-shrink-0;
  }
</style>