import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { tasks, fetchTasks } = useTasks();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const isFirstLoad = useRef(true);

  const loadTasks = useCallback(async () => {
    // Only show loading spinner on first load
    if (isFirstLoad.current) {
      setLoading(true);
    }

    try {
      await fetchTasks(search, status, priority, dueDate);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false; // Set to false after first load
      }
    }
  }, [fetchTasks, search, status, priority, dueDate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTasks();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [search, status, priority, dueDate, loadTasks]);

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setPriority('');
    setDueDate('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-indigo-700">Your Tasks</h2>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-full border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white/80"
          />
        </form>
        <Link to="/tasks/new" className="bg-gradient-to-r from-blue-500 to-yellow-300 text-white font-bold px-6 py-2 rounded-full shadow hover:from-blue-600 hover:to-yellow-400 transition-all">+ Add Task</Link>
      </div>

      {/* Filters Section */}
      <div className="mb-6 bg-white/80 p-4 rounded-2xl shadow-lg">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="p-2 rounded-full border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white/80"
              style={{ minWidth: 150 }}
            >
              <option value="">All Statuses</option>
              <option value="todo">To-Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="p-2 rounded-full border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white/80"
              style={{ minWidth: 150 }}
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="p-2 rounded-full border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white/80"
            />
          </div>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg font-semibold flex flex-col items-center gap-4">
            <span>No tasks found.</span>
            <Link to="/tasks/new" className="bg-gradient-to-r from-blue-500 to-yellow-300 text-white font-bold px-6 py-2 rounded-full shadow hover:from-blue-600 hover:to-yellow-400 transition-all">+ Add Your First Task</Link>
          </div>
        ) : (
          tasks.map(task => (
            <Link to={`/tasks/${task._id}`} key={task._id} className="block bg-white/80 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-300 group relative overflow-hidden">
              <div className="font-extrabold text-xl text-indigo-700 group-hover:text-pink-600 transition-all">{task.title}</div>
              <div className="text-sm mt-2 mb-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mr-2 ${
                  task.status === 'done'
                    ? 'bg-green-200 text-green-800'
                    : task.status === 'inprogress'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-blue-200 text-blue-800'
                }`}>
                  {task.status.replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="inline-block px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700 font-semibold">
                  Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="text-gray-500 text-sm mt-2">
                {task.description || <span className="italic text-gray-300">No description</span>}
              </div>
              <div className="absolute right-4 top-4 text-2xl opacity-10 group-hover:opacity-30 transition-all">📝</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;