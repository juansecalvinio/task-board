import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Task = {
  title?: string;
  state: string;
};

export interface Store {
  tasks: Task[];
  draggedTask: string | null;
  addTask: (task: Task) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | undefined | null) => void;
  moveTask: (title: string, state: string) => void;
}

export const useStore = create(
  persist(
    devtools<Store>((set) => ({
      tasks: [],
      draggedTask: null,
      addTask: ({ title, state }) => {
        set((store) => ({ tasks: [...store.tasks, { title, state }] }));
      },
      deleteTask: (title) => {
        set((store) => ({
          tasks: store.tasks.filter((task) => task.title !== title),
        }));
      },
      setDraggedTask: (title) => set({ draggedTask: title }),
      moveTask: (title, state) =>
        set((store) => ({
          tasks: store.tasks.map((task) =>
            task.title === title ? { title, state } : task
          ),
        })),
    })),
    { name: "store" }
  )
);
