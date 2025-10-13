<script lang="ts">
  import ClientCard from "$lib/Components/ClientCard.svelte";
  import AddClient from "$lib/Components/AddClient.svelte";
  import * as lib from "../../lib/lib";
  import { onMount } from "svelte";

  let clients: lib.Clients[] = [];

  async function loadClients() {
    clients = await lib.getClients();
  }

  onMount(loadClients);
</script>

<svelte:head>
  <title>Clients - Project Overseer</title>
</svelte:head>

<div class="max-w-6xl">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-800">Clients</h1>
  </div>

  <!-- Add Client Component -->
  <AddClient on:add={loadClients} />

  <!-- Clients Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each clients as client (client.id)}
      <ClientCard {client} />
    {/each}
  </div>

  <!-- Empty State (if no clients) -->
  {#if clients.length === 0}
    <div class="bg-white rounded-lg shadow-md p-8 text-center">
      <div class="text-gray-400 text-4xl mb-4">👥</div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">No clients yet</h3>
      <p class="text-gray-500">Add your first client to get started</p>
    </div>
  {/if}
</div>