import { Request, Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, status, priority, dueDate } = req.query;
    let query: any = { user: req.userId };
    
    // Search functionality
    if (search && typeof search === 'string') {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Status filter
    if (status && typeof status === 'string' && ['todo', 'inprogress', 'done'].includes(status)) {
      query.status = status;
    }
    
    // Priority filter
    if (priority && typeof priority === 'string' && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }
    
    // Due date filter
    if (dueDate && typeof dueDate === 'string') {
      const startDate = new Date(dueDate);
      const endDate = new Date(dueDate);
      endDate.setDate(endDate.getDate() + 1);
      query.dueDate = {
        $gte: startDate,
        $lt: endDate
      };
    }
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err: any) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

export const getTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (err: any) {
    console.error('Get task error:', err);
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    
    // Validation
    if (!title || title.trim().length === 0) {
      res.status(400).json({ message: 'Title is required' });
      return;
    }
    
    if (title.length > 100) {
      res.status(400).json({ message: 'Title must be less than 100 characters' });
      return;
    }
    
    const task = new Task({
      user: req.userId,
      title: title.trim(),
      description: description?.trim(),
      dueDate: dueDate || null,
      priority: priority || 'medium',
      status: status || 'todo',
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (err: any) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    
    // Validation
    if (title !== undefined && (title.trim().length === 0 || title.length > 100)) {
      res.status(400).json({ message: 'Title must be between 1 and 100 characters' });
      return;
    }
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim();
    if (dueDate !== undefined) updateData.dueDate = dueDate || null;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (err: any) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err: any) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
