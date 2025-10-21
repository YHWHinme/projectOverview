<script lang="ts">
	import * as lib from "../../lib/lib";
	import type { Tasks } from "../../lib/lib";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import TaskItem from "$lib/Components/TaskItem.svelte";
	import TaskModal from "$lib/Components/TaskModal.svelte";
	import AddTask from "$lib/Components/AddTask.svelte";
	import { taskModal } from "$lib/stores/modal";

	let tasks: Tasks[] = [];
	let projectId: number;
	let projectName: string = "Unknown";

	// Binds whatever the dynamic id is to projectId or zero
	// NOTE: State section
	$: showCompleted = false;
	$: projectId = parseInt($page.params.project_id || "0");

	async function loadTasks() {
		tasks = await lib.getProjectTask(projectId);
		// Get project name
		const projects = await lib.getProjectItem();
		const project = projects.find((p) => p.id === projectId);
		projectName = project ? project.name : "Unknown";
	}

	// TODO: Access the value from check task complete and update the complete boolean after
	async function handleToggle(event: any) {
		const taskId = event.detail;
		const task = tasks.find((t) => t.id === taskId);
		if (task) {
			const newComplete = task.complete === 1 ? 0 : 1;
			const result = await lib.updateTaskComplete(taskId, newComplete);
			if (result === 200) {
				loadTasks();
			} else {
				alert("Failed to update task");
			}
		}
	}

	// NOTE: Event handlers
	async function handleDelete(event: any) {
		const result = await lib.deleteTask(event.detail);
		if (result === 200) {
			loadTasks();
		} else {
			alert("Failed to delete task");
		}
	}

	async function handleTaskDescUpdate(event: any) {
		const { taskId, description } = event.detail;
		const result = await lib.updateTaskDescription(taskId, description);
		if (result === 200) {
			loadTasks();
		} else {
			alert("Failed to update task description");
		}
	}

	async function handleRename(event: any) {
		const { id, name } = event.detail;
		const result = await lib.renameTask(name, id);
		if (result === 200) {
			loadTasks();
		} else {
			alert("Failed to rename task");
		}
	}

	function handleViewDetails(event: any) {
		taskModal.openModal(event.detail);
	}

	onMount(async () => {
		loadTasks();
	});
</script>

<!-- TODO: Change the base app background colour -->
<div class="bg-app-background">
	<!-- Add Task Component -->
	<AddTask {projectId} on:add={loadTasks} />

	<br />
	<div class="flex items-center space-x-4">
		<label class="flex items-center text-sm">
			<input
				type="checkbox"
				bind:checked={showCompleted}
				class="mr-2 rounded"
			/>
			Show completed tasks
		</label>
	</div>
	<br />

	<!-- Checking if there are tasks -->
	{#if tasks.length === 0}
		<p>You've got no tasks...</p>
	{:else}
		<!-- Displaying the tasks -->
		{#each tasks as task}
			{#if showCompleted || task.complete === 0}
				<div>
					<TaskItem
						task={{
							id: task.id,
							title: task.title,
							completed: task.complete === 1,
							description: task.description,
							priority: "medium",
							project: projectName,
							dueDate: null,
							labels: [],
						}}
						on:toggle={handleToggle}
						on:delete={handleDelete}
						on:rename={handleRename}
						on:view-details={handleViewDetails}
					/>
				</div>
			{/if}
		{/each}
	{/if}

	<!-- Task Modal -->
	<TaskModal on:update-description={handleTaskDescUpdate} />
</div>
