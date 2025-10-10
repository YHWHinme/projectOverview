<script lang="ts">
	import * as lib from "../../lib/lib"
	import { onMount } from "svelte";
	import TaskBit from "$lib/Components/TaskBit.svelte";


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
