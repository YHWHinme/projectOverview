<script>
  import "../app.css";
  import Sidebar from "$lib/Components/Sidebar.svelte";
</script>

<div class="flex h-screen bg-gray-100">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content -->
  <main class="flex-1 p-8 overflow-y-auto">
    <slot />
  </main>
</div>
