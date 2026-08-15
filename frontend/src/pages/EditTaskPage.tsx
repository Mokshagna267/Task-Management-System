import React from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const EditTaskPage: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <div className="p-8 text-center text-red-500">Task ID is required</div>;
  }

  return <TaskForm />;
};

export default EditTaskPage;