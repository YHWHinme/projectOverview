<script lang="ts">
	// Defining imports
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// Defining props
	export let id: number;
	export let title: string;
	export let projectId: number;
	export let completed: boolean = false;

	function handleToggle() {
		completed = !completed;
	}

	function deleteTask() {
		dispatch('delete', id);
	}
</script>

<div
	class="flex items-start space-x-3 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors group ml-4 mb-1 border-b border-gray-100"
>
	<!-- Checkbox -->
	<button
		on:click={handleToggle}
		class="mt-0.5 w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center transition-colors flex-shrink-0"
		class:bg-gray-500={completed}
		class:border-gray-500={completed}
	>
		{#if completed}
			<svg
				class="w-2.5 h-2.5 text-white"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
	</button>

	<!-- Task Content -->
	<div class="flex-1 min-w-0">
		<div class="flex items-center justify-between">
			<p
				class="text-gray-800 text-sm {completed
					? 'line-through text-gray-500'
					: ''}"
			>
				{title}
			</p>

			<button
				on:click={deleteTask}
				class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 flex-shrink-0"
			>
				<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>

		<!-- Task metadata -->
		<div class="flex items-center space-x-2 mt-1">
			<span class="text-xs text-gray-500">Project {projectId}</span>
		</div>
	</div>
</div>
