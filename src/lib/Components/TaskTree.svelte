<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Tasks } from "../lib";
	import TaskItem from "./TaskItem.svelte";

	export let tasks: Tasks[] = [];
	export let projectName: string = "Unknown";
	export let depth: number = 0;

	const dispatch = createEventDispatcher();

	function handleToggle(taskId: number) {
		dispatch("toggle", taskId);
	}

	function handleDelete(taskId: number) {
		dispatch("delete", taskId);
	}

	function handleRename(event: any) {
		dispatch("rename", event.detail);
	}

	function handleViewDetails(task: any) {
		dispatch("view-details", task);
	}
</script>

{#each tasks as task}
	<div class="task-tree-item" style="margin-left: {depth * 24}px;">
		<!-- Connecting line for child tasks -->
		{#if depth > 0}
			<div class="absolute left-0 top-0 bottom-0 w-px bg-gray-300" style="left: {(depth - 1) * 24 + 12}px;"></div>
		{/if}

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
			on:toggle={(e) => handleToggle(e.detail)}
			on:delete={(e) => handleDelete(e.detail)}
			on:rename={handleRename}
			on:view-details={(e) => handleViewDetails(e.detail)}
		/>

		<!-- Recursive rendering of children -->
		{#if task.children && task.children.length > 0}
			<svelte:self tasks={task.children} {projectName} depth={depth + 1} on:toggle on:delete on:rename on:view-details />
		{/if}
	</div>
{/each}

<style>
	.task-tree-item {
		position: relative;
	}
</style>