<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import Sidebar from "$lib/Components/Sidebar.svelte";

  let response: string | undefined;
  let currentView = 'dashboard';

  const greet = async () => {
    response = await invoke("hello");
  };

  function handleNavigation(event: CustomEvent<{ itemId: string }>) {
    currentView = event.detail.itemId;
    console.log('Navigated to:', currentView);
  }
</script>

  <!-- Sidebar -->
  <Sidebar on:navigate={handleNavigation} />
