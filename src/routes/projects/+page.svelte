<script lang="ts">
	import ProjectCard from "$lib/Components/ProjectCard.svelte";
	import AddProject from "$lib/Components/AddProject.svelte";
	import AddClient from "$lib/Components/AddClient.svelte";
	import * as lib from "../../lib/lib";
	import { onMount } from "svelte";

	let dbProjects: lib.Projects[] = [];

	// Adapted projects for ProjectCard
	$: projects = dbProjects.map((project) => ({
		id: project.id,
		name: project.name,
		description: "", // DB doesn't have description
		status: "Active", // Default status
		progress: 0, // DB doesn't have progress
		dueDate: "", // DB doesn't have dueDate
		team: [], // DB doesn't have team
	}));

	async function loadProjects() {
		dbProjects = await lib.getProjectItem();
	}

	async function handleDelete(event: any) {
		const result = await lib.deleteProject(event.detail);
		if (result === 200) {
			loadProjects();
		} else {
			alert("Failed to delete project");
		}
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

	<!-- TODO: Add Title of the Project -->
	<!-- Add Project Component -->
	<AddProject on:add={loadProjects} />

	<!-- Projects Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each projects as project (project.id)}
			<ProjectCard {project} on:delete={handleDelete} />
		{/each}
	</div>

	<!-- Empty State (if no projects) -->
	{#if projects.length === 0}
		<div class="bg-white rounded-lg shadow-md p-8 text-center">
			<div class="text-gray-400 text-4xl mb-4">📁</div>
			<h3 class="text-lg font-medium text-gray-700 mb-2">No projects yet</h3>
			<p class="text-gray-500 mb-4">Create your first project to get started</p>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Create Project
			</button>
		</div>
	{/if}
</div>
