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

<form class="add-task-form" on:submit|preventDefault={addTask}>
  <input
    bind:value={title}
    placeholder="Add a new task..."
    class="add-task-input"
    required
  />
  <button type="submit" class="add-task-btn">Add</button>
</form>

<style>
  .add-task-form {
    @apply flex items-start space-x-3 py-2 px-3 rounded-md bg-app-secondary border-b border-app-text-secondary ml-4 mb-1;
  }
  .add-task-input {
    @apply flex-1 px-3 py-1 text-sm text-app-text-primary border border-app-text-secondary rounded focus:outline-none focus:ring-1 focus:ring-app-accent-primaryAccent;
  }
  .add-task-btn {
    @apply px-3 py-1 bg-app-accent-primaryAccent text-app-background text-sm rounded hover:bg-app-accent-secondaryAccent transition-colors flex-shrink-0;
  }
</style>