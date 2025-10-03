<script lang="ts">
	import { invoke } from "@tauri-apps/api/core";
	import { onMount } from "svelte";
	import TaskBit from "$lib/Components/TaskBit.svelte";

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
		tasks = await invoke<TasksOutput[]>("get_from_tasks");
	});
</script>

<h1>Hello from project</h1>
<p>{tasks.length} tasks loaded</p>
<br />
<!-- Display the list of tasks once loaded -->
{#each tasks as task}
	<TaskBit id={task.id} title={task.title} projectId={task.project_id} />
{/each}
<!-- Show loading message if tasks are still being fetched -->
{#if tasks.length === 0}
	<p>{tasks.length} tasks loaded</p>
{/if}
