import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// Routes
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/users';
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.MONGO_URI;
const LOCAL_URI = 'mongodb://localhost:27017/taskapp';

// MongoDB connection options
const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

async function connectToMongoDB() {
  // Try Atlas first if available
  if (ATLAS_URI) {
    try {
      await mongoose.connect(ATLAS_URI, mongoOptions);
      console.log('✅ MongoDB Atlas connected');
      return true;
    } catch (err: any) {
      console.log('⚠️ Atlas failed, trying local MongoDB...');
    }
  }

  // Fall back to local MongoDB
  try {
    await mongoose.connect(LOCAL_URI, mongoOptions);
    console.log('✅ Local MongoDB connected');
    return true;
  } catch (err: any) {
    console.error('❌ Failed to connect to MongoDB');
    console.log('💡 Install MongoDB locally or check internet connection');
    return false;
  }
}

// Start server
connectToMongoDB().then((connected) => {
  if (connected) {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } else {
    process.exit(1);
  }
});