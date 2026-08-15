import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  status: 'todo' | 'inprogress' | 'done';
  createdAt?: string;
  updatedAt?: string;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  fetchTasks: (search?: string, status?: string, priority?: string, dueDate?: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async (search?: string, status?: string, priority?: string, dueDate?: string) => {
    try {
      const params: any = {};
      if (search) params.search = search;
      if (status) params.status = status;
      if (priority) params.priority = priority;
      if (dueDate) params.dueDate = dueDate;
      const res = await api.get('/tasks', { params });
      setTasks(res.data);
    } catch (err) {
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
