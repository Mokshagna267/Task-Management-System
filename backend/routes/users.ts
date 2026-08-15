import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

// GET /api/users/profile - Get current user profile
router.get('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 