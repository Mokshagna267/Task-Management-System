import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarPage: React.FC = () => {
  const { tasks } = useTasks();
  const navigate = useNavigate();

  // Map tasks to calendar events
  const events = useMemo<Event[]>(() =>
    tasks
      .filter(task => task.dueDate)
      .map(task => ({
        id: task._id,
        title: task.title,
        start: new Date(task.dueDate!),
        end: new Date(task.dueDate!),
        allDay: true,
        resource: task,
      })),
    [tasks]
  );

  const onSelectEvent = (event: Event) => {
    if (event.resource && event.resource._id) {
      navigate(`/tasks/${event.resource._id}`);
    }
  };

  const eventStyleGetter = (event: Event) => {
    const task = event.resource as any;
    let backgroundColor = '#3B82F6'; // Default blue
    
    // Color coding based on priority
    switch (task?.priority) {
      case 'high':
        backgroundColor = '#EF4444'; // Red
        break;
      case 'medium':
        backgroundColor = '#F59E0B'; // Amber
        break;
      case 'low':
        backgroundColor = '#10B981'; // Green
        break;
    }

    // Color coding based on status
    if (task?.status === 'done') {
      backgroundColor = '#6B7280'; // Gray
    }

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '4px',
        fontWeight: '500',
      }
    };
  };

  const tasksWithDueDate = tasks.filter(task => task.dueDate);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Task Calendar
          </h1>
          <p className="text-gray-600">
            View your tasks on a calendar
          </p>
        </div>

        {/* Simple Calendar */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          {tasksWithDueDate.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks with due dates</h3>
              <p className="text-gray-500 mb-4">Add tasks with due dates to see them on the calendar</p>
              <button
                onClick={() => navigate('/add-task')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={onSelectEvent}
              eventPropGetter={eventStyleGetter}
              popup
              selectable
              toolbar={true}
            />
          )}
        </div>

        {/* Simple Legend */}
        <div className="mt-4 text-sm text-gray-600">
          <span className="inline-block w-3 h-3 bg-red-500 rounded mr-2"></span>
          High Priority
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded mx-2"></span>
          Medium Priority
          <span className="inline-block w-3 h-3 bg-green-500 rounded mx-2"></span>
          Low Priority
          <span className="inline-block w-3 h-3 bg-gray-500 rounded mx-2"></span>
          Completed
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;