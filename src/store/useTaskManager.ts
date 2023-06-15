import { useRef } from 'react';
import create from 'zustand';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type TaskState = {
  tasks: Task[];
  searchTask: string;
  setSearchTask: (search: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
};

const useTaskManager = create<TaskState>((set) => ({
  tasks: [],
  searchTask: '',
  setSearchTask: (search) => set({ searchTask: search }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export default useTaskManager;
