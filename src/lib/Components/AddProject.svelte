<script lang="ts">
  import * as lib from "$lib/lib";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  let name = "";
  let clients: lib.Clients[] = [];
  let selectedClientId: number = 0;

  onMount(async () => {
    clients = await lib.getClients();
  });

  async function addProject() {
    if (!name.trim()) return;
    const result = await lib.createProject(name, selectedClientId);
    if (result === 200) {
      name = ""; // Clear input
      dispatch('add');
    } else {
      alert('Failed to add project');
    }
  }
</script>

<form class="add-project-form" on:submit|preventDefault={addProject}>
  <input
    bind:value={name}
    placeholder="Project name..."
    class="add-project-input"
    required
  />
  <select bind:value={selectedClientId} class="add-project-select">
    <option value={0}>No Client</option>
    {#each clients as client}
      <option value={client.id}>{client.name}</option>
    {/each}
  </select>
  <button type="submit" class="add-project-btn">Add Project</button>
</form>

<style>
  .add-project-form {
    @apply flex items-start space-x-3 py-2 px-3 rounded-md bg-app-secondary border-b border-app-text-secondary ml-4 mb-1;
  }
  .add-project-input {
    @apply flex-1 px-3 py-1 text-sm text-app-text-primary border border-app-text-secondary rounded focus:outline-none focus:ring-1 focus:ring-app-accent-primaryAccent;
  }
  .add-project-select {
    @apply px-3 py-1 text-sm text-app-text-primary border border-app-text-secondary rounded focus:outline-none focus:ring-1 focus:ring-app-accent-primaryAccent;
  }
  .add-project-btn {
    @apply px-3 py-1 bg-app-accent-primaryAccent text-app-background text-sm rounded hover:bg-app-accent-secondaryAccent transition-colors flex-shrink-0;
  }
</style>
