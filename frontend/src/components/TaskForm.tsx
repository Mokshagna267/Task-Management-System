import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inprogress' | 'done';
}

const TaskForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchTasks } = useTasks();
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState<TaskFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'todo',
    },
  });

  React.useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const taskData = await response.json();
        setTask(taskData);
        reset(taskData);
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const onSubmit = async (data: TaskFormData) => {
    setLoading(true);
    try {
      const url = id ? `/api/tasks/${id}` : '/api/tasks';
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (id) {
          toast.success('Task updated successfully!');
        } else {
          toast.success('Task created successfully!');
        }
        await fetchTasks();
        navigate('/dashboard');
      } else {
        throw new Error('Failed to save task');
      }
    } catch (error) {
      toast.error('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-lg mx-auto mt-12 border-2 border-blue-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 drop-shadow-lg">
        {id ? 'Edit Task' : 'Add Task'}
      </h2>
      
      <div className="mb-5">
        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: 'Title is required' })}
          className={`w-full p-3 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${
            errors.title ? 'border-red-300' : 'border-blue-200'
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1 ml-3">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-5">
        <textarea
          placeholder="Description"
          {...register('description')}
          className="w-full p-3 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />
      </div>

      <div className="mb-5">
        <input
          type="date"
          {...register('dueDate')}
          className="w-full p-3 border-2 border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />
      </div>

      <div className="flex gap-4 mb-5">
        <div className="flex-1">
          <select
            {...register('priority', { required: 'Priority is required' })}
            className={`w-full p-3 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${
              errors.priority ? 'border-red-300' : 'border-blue-200'
            }`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1 ml-3">{errors.priority.message}</p>
          )}
        </div>

        <div className="flex-1">
          <select
            {...register('status', { required: 'Status is required' })}
            className={`w-full p-3 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${
              errors.status ? 'border-red-300' : 'border-blue-200'
            }`}
          >
            <option value="todo">To-Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1 ml-3">{errors.status.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold p-3 rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : (id ? 'Update' : 'Create') + ' Task'}
      </button>
    </form>
  );
};

export default TaskForm;
