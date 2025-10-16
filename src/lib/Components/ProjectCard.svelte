<script lang="ts">
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";
  import { projectModal } from "$lib/stores/modal";

  export let project: {
    id: number;
    name: string;
    description: string;
    status: string;
    dueDate: string;
    team: string[];
    progress?: number;
  };

  const dispatch = createEventDispatcher();

  function getStatusColor(status: string) {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "In Progress":
        return "text-blue-600 bg-blue-100";
      case "Planning":
        return "text-yellow-600 bg-yellow-100";
      case "On Hold":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function deleteProject() {
    dispatch("delete", project.id);
  }

  function viewDetails() {
    projectModal.openModal({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      dueDate: project.dueDate,
      team: project.team,
      progress: project.progress || 0
    });
  }
</script>

<div
	class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
>
	<!-- Project Header -->
	<div class="flex justify-between items-start mb-4">
		<button
			class="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors text-left"
			on:click={() => goto(`/${project.id}`)}
		>
			{project.name}
		</button>
		<div class="flex items-center space-x-2">
			<span
				class="px-2 py-1 rounded-full text-xs font-medium {getStatusColor(
					project.status,
				)}"
			>
				{project.status}
			</span>

			<!-- Delete button -->
			<button
				on:click={deleteProject}
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
	</div>

	<!-- Project Description -->
	<p class="text-gray-600 text-sm mb-4">{project.description}</p>

	<!-- Progress Bar -->
	<div class="mb-4">
		<div class="flex justify-between items-center mb-1">
			<span class="text-xs font-medium text-gray-600">Progress</span>
			<span class="text-xs text-gray-600">{project.progress}%</span>
		</div>
		<div class="w-full bg-gray-200 rounded-full h-2">
			<div
				class="bg-blue-500 h-2 rounded-full transition-all duration-300"
				style="width: {project.progress}%"
			></div>
		</div>
	</div>

	<!-- Project Details -->
	<div class="flex justify-between items-center text-sm">
		<div>
			<span class="text-gray-500">Due:</span>
			<span class="text-gray-700 ml-1"
				>{new Date(project.dueDate).toLocaleDateString()}</span
			>
		</div>
		<div class="flex items-center space-x-1">
			<span class="text-gray-500">Team:</span>
			<div class="flex -space-x-1">
				{#each project.team.slice(0, 3) as member, index}
					<div
						class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white"
						title={member}
					>
						{member[0]}
					</div>
				{/each}
				{#if project.team.length > 3}
					<div
						class="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-white"
					>
						+{project.team.length - 3}
					</div>
				{/if}
			</div>
		</div>
	</div>

  <!-- Action Buttons -->
  <div class="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
    <button
      on:click={viewDetails}
      class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-xs font-medium transition-colors"
    >
      View Details
    </button>
  </div>
</div>
