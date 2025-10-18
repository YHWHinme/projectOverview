<script lang="ts">
	import { taskModal } from "$lib/stores/modal";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	let isEditingDescription = false;
	let editDescriptionValue = "";

	function closeModal() {
		taskModal.closeModal();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			if (isEditingDescription) {
				cancelDescriptionEdit();
			} else {
				closeModal();
			}
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function startDescriptionEdit() {
		isEditingDescription = true;
		editDescriptionValue = $taskModal.task?.description || "";
	}

	function saveDescriptionEdit() {
		if (
			$taskModal.task &&
			editDescriptionValue.trim() !== $taskModal.task.description
		) {
			dispatch("update-description", {
				taskId: $taskModal.task.id,
				description: editDescriptionValue.trim(),
			});
		}
		isEditingDescription = false;
	}

	function cancelDescriptionEdit() {
		isEditingDescription = false;
		editDescriptionValue = $taskModal.task?.description || "";
	}

	function handleDescriptionKeydown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			saveDescriptionEdit();
		} else if (event.key === "Escape") {
			cancelDescriptionEdit();
		}
	}

	function focusInput(node: HTMLTextAreaElement) {
		setTimeout(() => {
			node.focus();
			node.select();
		}, 0);
	}

	function getPriorityColor(priority: string) {
		switch (priority) {
			case "high":
				return "bg-red-100 text-red-800";
			case "medium":
				return "bg-yellow-100 text-yellow-800";
			case "low":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	}

	function formatDate(dateStr: string | null) {
		if (!dateStr) return "";
		const date = new Date(dateStr);
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);

		if (date.toDateString() === today.toDateString()) return "Today";
		if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
		return date.toLocaleDateString();
	}

	function isOverdue(dateStr: string | null) {
		if (!dateStr) return false;
		return new Date(dateStr) < new Date();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $taskModal.isOpen && $taskModal.task}
	{@const task = $taskModal.task}

	<!-- Backdrop -->
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
		on:click={handleBackdropClick}
	>
		<!-- Modal Content -->
		<div
			class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
		>
			<!-- Header -->
			<div
				class="flex justify-between items-start p-6 border-b border-gray-200"
			>
				<h2 class="text-xl font-semibold text-gray-900">{task.title}</h2>
				<button
					on:click={closeModal}
					class="text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Close modal"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Content -->
			<div class="p-6 space-y-4">
				<!-- Description -->
				<div>
					<div class="flex items-center justify-between mb-2">
						<h3
							class="text-sm font-medium text-gray-500 uppercase tracking-wide"
						>
							Description
						</h3>
						{#if !isEditingDescription}
							<button
								on:click={startDescriptionEdit}
								class="text-gray-400 hover:text-blue-500 transition-colors p-1"
								aria-label="Edit description"
							>
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
									/>
								</svg>
							</button>
						{/if}
					</div>
					{#if isEditingDescription}
						<textarea
							bind:value={editDescriptionValue}
							on:keydown={handleDescriptionKeydown}
							on:blur={saveDescriptionEdit}
							class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
							rows="3"
							placeholder="Enter task description..."
							use:focusInput
						/>
					{:else}
						<p class="text-gray-900">
							{#if task.description}
								{task.description}
							{:else}
								<span class="text-gray-500 italic"
									>No description available</span
								>
							{/if}
						</p>
					{/if}
				</div>

				<!-- Status -->
				<div>
					<h3
						class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
					>
						Status
					</h3>
					<span
						class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {task.completed
							? 'bg-green-100 text-green-800'
							: 'bg-gray-100 text-gray-800'}"
					>
						{task.completed ? "Completed" : "In Progress"}
					</span>
				</div>

				<!-- Priority -->
				<div>
					<h3
						class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
					>
						Priority
					</h3>
					<span
						class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getPriorityColor(
							task.priority,
						)}"
					>
						{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
					</span>
				</div>

				<!-- Project -->
				<div>
					<h3
						class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
					>
						Project
					</h3>
					<p class="text-gray-900">{task.project}</p>
				</div>

				<!-- Due Date -->
				<div>
					<h3
						class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
					>
						Due Date
					</h3>
					<p class="text-gray-900">
						{#if task.dueDate}
							<span
								class={isOverdue(task.dueDate)
									? "text-red-600"
									: "text-gray-900"}
							>
								{formatDate(task.dueDate)}
							</span>
						{:else}
							<span class="text-gray-500 italic">No due date set</span>
						{/if}
					</p>
				</div>

				<!-- Labels -->
				{#if task.labels && task.labels.length > 0}
					<div>
						<h3
							class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
						>
							Labels
						</h3>
						<div class="flex flex-wrap gap-2">
							{#each task.labels as label}
								<span
									class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded"
								>
									#{label}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
				<button
					on:click={closeModal}
					class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
