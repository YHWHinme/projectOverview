<script lang="ts">
  import ProjectCard from "$lib/Components/ProjectCard.svelte";
  import AddProject from "$lib/Components/AddProject.svelte";
  import AddClient from "$lib/Components/AddClient.svelte";
  import * as lib from "../../lib/lib";
  import { onMount } from "svelte";

  let projects: any[] = []; // TODO: Define Project interface

  async function loadProjects() {
    // For now, keep mock data; replace with DB load when getProjects is added
    projects = [
      {
        id: 1,
        name: "Website Redesign",
        description: "Complete overhaul of the company website with modern design",
        status: "In Progress",
        progress: 65,
        dueDate: "2024-02-15",
        team: ["Alice", "Bob", "Carol"]
      },
      {
        id: 2,
        name: "Mobile App Development",
        description: "Cross-platform mobile application for iOS and Android",
        status: "Planning",
        progress: 25,
        dueDate: "2024-03-30",
        team: ["David", "Eve"]
      },
      {
        id: 3,
        name: "Database Migration",
        description: "Migrate legacy database to new cloud infrastructure",
        status: "Completed",
        progress: 100,
        dueDate: "2024-01-10",
        team: ["Frank", "Grace"]
      },
      {
        id: 4,
        name: "API Integration",
        description: "Integrate third-party APIs for enhanced functionality",
        status: "On Hold",
        progress: 45,
        dueDate: "2024-04-20",
        team: ["Henry", "Iris", "Jack"]
      }
    ];
  }

  onMount(loadProjects);
</script>

<svelte:head>
  <title>Projects - Project Overseer</title>
</svelte:head>

<div class="max-w-6xl">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-800">Projects</h1>
  </div>

  <!-- Add Project Component -->
  <AddProject on:add={loadProjects} />

  <!-- Add Client Component -->
  <AddClient on:add={loadProjects} />

  <!-- Projects Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each projects as project (project.id)}
      <ProjectCard {project} />
    {/each}
  </div>

  <!-- Empty State (if no projects) -->
  {#if projects.length === 0}
    <div class="bg-white rounded-lg shadow-md p-8 text-center">
      <div class="text-gray-400 text-4xl mb-4">📁</div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">No projects yet</h3>
      <p class="text-gray-500 mb-4">Create your first project to get started</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Project
      </button>
    </div>
  {/if}
</div>