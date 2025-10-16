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

interface ModalState {
  isOpen: boolean;
  project: ProjectModalData | null;
}

function createModalStore() {
  const { subscribe, set, update } = writable<ModalState>({
    isOpen: false,
    project: null
  });

  return {
    subscribe,
    openModal: (project: ProjectModalData) => set({ isOpen: true, project }),
    closeModal: () => set({ isOpen: false, project: null })
  };
}

export const projectModal = createModalStore();