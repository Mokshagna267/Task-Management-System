import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not configured');
    res.status(500).json({ message: 'Server configuration error' });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expired. Please login again.' });
    } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid token. Please login again.' });
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
    return;
  }
};
