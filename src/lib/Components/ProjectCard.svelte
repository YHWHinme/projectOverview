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
        return "text-knlCard-text-function bg-app-secondary";
      case "In Progress":
        return "text-app-accent-primaryAccent bg-app-secondary";
      case "Planning":
        return "text-app-accent-secondaryAccent bg-app-secondary";
      case "On Hold":
        return "text-app-text-secondary bg-app-secondary";
      default:
        return "text-app-text-secondary bg-app-secondary";
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
	class="bg-cardHouse-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
>
	<!-- Project Header -->
	<div class="flex justify-between items-start mb-4">
		<button
			class="text-lg font-semibold text-app-text-primary cursor-pointer hover:text-app-accent-primaryAccent transition-colors text-left"
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
				class="opacity-0 group-hover:opacity-100 text-app-text-secondary hover:text-app-accent-primaryAccent transition-all p-1 flex-shrink-0"
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
	<p class="text-app-text-secondary text-sm mb-4">{project.description}</p>

	<!-- Progress Bar -->
	<div class="mb-4">
		<div class="flex justify-between items-center mb-1">
			<span class="text-xs font-medium text-app-text-secondary">Progress</span>
			<span class="text-xs text-app-text-secondary">{project.progress}%</span>
		</div>
		<div class="w-full bg-app-secondary rounded-full h-2">
			<div
				class="bg-app-accent-primaryAccent h-2 rounded-full transition-all duration-300"
				style="width: {project.progress}%"
			></div>
		</div>
	</div>

	<!-- Project Details -->
	<div class="flex justify-between items-center text-sm">
		<div>
			<span class="text-app-text-secondary">Due:</span>
			<span class="text-app-text-primary ml-1"
				>{new Date(project.dueDate).toLocaleDateString()}</span
			>
		</div>
		<div class="flex items-center space-x-1">
			<span class="text-app-text-secondary">Team:</span>
			<div class="flex -space-x-1">
				{#each project.team.slice(0, 3) as member, index}
					<div
						class="w-6 h-6 bg-app-secondary rounded-full flex items-center justify-center text-xs font-medium text-app-text-primary border-2 border-app-background"
						title={member}
					>
						{member[0]}
					</div>
				{/each}
				{#if project.team.length > 3}
					<div
						class="w-6 h-6 bg-app-text-secondary rounded-full flex items-center justify-center text-xs font-medium text-app-background border-2 border-app-background"
					>
						+{project.team.length - 3}
					</div>
				{/if}
			</div>
		</div>
	</div>

  <!-- Action Buttons -->
  <div class="flex space-x-2 mt-4 pt-4 border-t border-app-text-secondary">
     <button
       on:click={viewDetails}
       class="flex-1 bg-modal-buttons-background hover:bg-modal-buttons-hovery text-modal-buttons-text py-2 px-3 rounded text-xs font-medium transition-colors"
     >
      View Details
    </button>
  </div>
</div>
