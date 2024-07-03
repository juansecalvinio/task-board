import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Task = {
  id: string;
  title?: string;
  state: string;
};

export interface Store {
  tasks: Task[];
  draggedTask: string | null;
  isModalNewTaskOpen: boolean;
  isModalDeleteTaskOpen: boolean;
  taskToDelete: string;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setDraggedTask: (id: string | undefined | null) => void;
  moveTask: (id: string, state: string) => void;
  setIsModalNewTaskOpen: (isModalNewTaskOpen: boolean) => void;
  setIsModalDeleteTaskOpen: (isModalDeleteTaskOpen: boolean) => void;
  setTaskToDelete: (id: string) => void;
}

export const useStore = create(
  persist(
    devtools<Store>((set) => ({
      tasks: [],
      draggedTask: null,
      isModalNewTaskOpen: false,
      isModalDeleteTaskOpen: false,
      taskToDelete: "",
      addTask: ({ id, title, state }) => {
        set((store) => ({ tasks: [...store.tasks, { id, title, state }] }));
      },
      deleteTask: (id) => {
        set((store) => ({
          tasks: store.tasks.filter((task) => task.id !== id),
        }));
      },
      setDraggedTask: (id) => set({ draggedTask: id }),
      moveTask: (id, state) =>
        set((store) => ({
          tasks: store.tasks.map((task) =>
            task.id === id ? { ...task, id, state } : task
          ),
        })),
      setIsModalNewTaskOpen: (isModalNewTaskOpen) =>
        set({ isModalNewTaskOpen }),
      setIsModalDeleteTaskOpen: (isModalDeleteTaskOpen) =>
        set({ isModalDeleteTaskOpen }),
      setTaskToDelete: (id: string) => set({ taskToDelete: id }),
    })),
    { name: "store" }
  )
);
