import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTasks } from '../context/TaskContext';
import api from '../api';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchTasks } = useTasks();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then(res => setTask(res.data))
      .catch(() => setError('Task not found'));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully!');
      fetchTasks();
      navigate('/dashboard');
    } catch {
      toast.error('Failed to delete task');
      setError('Failed to delete task');
    }
  };

  if (error) return <div className="p-8 text-center text-red-500 font-bold text-lg">{error}</div>;
  if (!task) return <div className="p-8 text-center text-indigo-500 font-bold text-lg animate-pulse">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 p-8 flex flex-col items-center">
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-lg border-2 border-blue-200">
        <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 drop-shadow-lg">{task.title}</h2>
        <div className="mb-3 flex gap-4 flex-wrap">
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${task.status === 'done' ? 'bg-green-200 text-green-800' : task.status === 'inprogress' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}>{task.status.replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>
          <span className="inline-block px-4 py-1 rounded-full text-sm bg-purple-100 text-purple-700 font-semibold">Priority: {task.priority}</span>
          <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700 font-semibold">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="mb-6 text-gray-600 text-lg">{task.description || <span className="italic text-gray-300">No description</span>}</div>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate(`/tasks/${id}/edit`)} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold px-6 py-2 rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all">Edit</button>
          <button onClick={handleDelete} className="bg-gradient-to-r from-red-400 to-pink-400 text-white font-bold px-6 py-2 rounded-full shadow hover:from-red-500 hover:to-pink-500 transition-all">Delete</button>
          <button onClick={() => navigate('/')} className="bg-gradient-to-r from-gray-200 to-gray-400 text-indigo-700 font-bold px-6 py-2 rounded-full shadow hover:from-gray-300 hover:to-gray-500 transition-all">Back</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
