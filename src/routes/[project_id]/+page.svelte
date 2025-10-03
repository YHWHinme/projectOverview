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

	// Deleting task
	async function delete_tasks(task_id: number) {
		try {
			await invoke("delete_task", { taskId: task_id });
			// Reload tasks after deletion
			tasks = await invoke<TasksOutput[]>("get_all_from_tasks");
		} catch (error) {
			alert("Failed to delete task: " + error);
			console.error("Delete error:", error);
		}
	}

	// Reactive variable to hold the list of tasks, initialized as empty array
	let tasks: TasksOutput[] = [];

	// Load tasks from the Tauri backend when the component mounts
	onMount(async () => {
		// Invoke the 'get_all_from_tasks' command to fetch all tasks from the database
		tasks = await invoke<TasksOutput[]>("get_all_from_tasks");
	});
</script>

<h1>Hello from project</h1>
<p>{tasks.length} tasks loaded</p>
<br />
<!-- Display the list of tasks once loaded -->
{#each tasks as task}
	<TaskBit
		id={task.id}
		title={task.title}
		projectId={task.project_id}
		on:delete={(event) => delete_tasks(event.detail)}
	/>
{/each}
<!-- Show loading message if tasks are still being fetched -->
{#if tasks.length === 0}
	<p>{tasks.length} tasks loaded</p>
{/if}
