<script lang="ts">
	import { invoke } from "@tauri-apps/api/core";
	import { onMount } from "svelte";

	// Define the structure of task data returned from the backend
	interface TasksOutput {
		id: number;
		title: string;
		project_id: number;
	}

	// Reactive variable to hold the list of tasks, initialized as empty array
	let tasks: TasksOutput[] = [];

	// Load tasks from the Tauri backend when the component mounts
	onMount(async () => {
		// Invoke the 'getFromTasks' command to fetch all tasks from the database
		tasks = await invoke<TasksOutput[]>("getFromTasks");
	});
</script>

<h1>Hello from project</h1>
<br />
<!-- Display the list of tasks once loaded -->
{#each tasks as task}
	<!-- Showing how many tasks there are -->
	<p>{tasks.length} tasks loaded</p>
	<br />

	<!-- Main logic -->
	<div class="task-item">
		<h2>{task.title}</h2>
		<p>ID: {task.id}, Project ID: {task.project_id}</p>
	</div>
{/each}
<!-- Show loading message if tasks are still being fetched -->
{#if tasks.length === 0}
	<p>{tasks.length} tasks loaded</p>
{/if}
