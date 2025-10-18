import { writable } from 'svelte/store';

export interface ProjectModalData {
  id: number;
  name: string;
  description: string;
  status: string;
  dueDate: string;
  team: string[];
  progress: number;
}

export interface TaskModalData {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  project: string;
  dueDate: string | null;
  labels: string[];
}

interface ProjectModalState {
  isOpen: boolean;
  project: ProjectModalData | null;
}

interface TaskModalState {
  isOpen: boolean;
  task: TaskModalData | null;
}

function createProjectModalStore() {
  const { subscribe, set, update } = writable<ProjectModalState>({
    isOpen: false,
    project: null
  });

  return {
    subscribe,
    openModal: (project: ProjectModalData) => set({ isOpen: true, project }),
    closeModal: () => set({ isOpen: false, project: null })
  };
}

function createTaskModalStore() {
  const { subscribe, set, update } = writable<TaskModalState>({
    isOpen: false,
    task: null
  });

  return {
    subscribe,
    openModal: (task: TaskModalData) => set({ isOpen: true, task }),
    closeModal: () => set({ isOpen: false, task: null })
  };
}

export const projectModal = createProjectModalStore();
export const taskModal = createTaskModalStore();