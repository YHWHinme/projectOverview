<script lang="ts">
	import * as lib from "../../lib/lib";
	import type { Task } from "../../lib/lib";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import TaskBit from "$lib/Components/TaskBit.svelte";
	import AddTask from "$lib/Components/AddTask.svelte";

	let tasks: Task[] = [];
	let projectId: number;

	// Binds whatever the dynamic id is to projectId or zero
	$: projectId = parseInt($page.params.project_id || "0");

	async function loadTasks() {
		const allTasks = await lib.getTasks();
		// Filters all tasks to get whatever the project id is
		tasks = allTasks.filter((task) => task.project_id === projectId);
	}

	onMount(async () => {
		loadTasks();
	});
</script>

<!-- Add Task Component -->
<AddTask {projectId} on:add={loadTasks} />

<!-- Checking if there are tasks -->
{#if tasks.length === 0}
	<p>You've got no tasks...</p>
{:else}
	<!-- Displaying the tasks -->
	{#each tasks as task}
		<div>
			<TaskBit id={task.id} title={task.title} projectId={task.project_id} />
		</div>
	{/each}
{/if}
