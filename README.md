# Task Management App

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Features

- ✅ User authentication (register/login)
- ✅ Create, read, update, delete tasks
- ✅ Task filtering by status, priority, and due date
- ✅ Search tasks by title/description
- ✅ Calendar view of tasks
- ✅ Responsive design with Tailwind CSS
- ✅ Toast notifications
- ✅ Protected routes

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (see setup options below)

### MongoDB Setup Options

#### Option 1: MongoDB Atlas (Cloud - Requires Internet)
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Create `.env` file in `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/taskapp
JWT_SECRET=your-secret-key
NODE_ENV=development
```

#### Option 2: Local MongoDB (Works Offline)
1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service
3. Create `.env` file in `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Management-App
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm run dev
   ```

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm start
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000


## Project Structure

```
Task Management App/
├── backend/
│   ├── controllers/     # Route controllers (auth, task logic)
│   ├── middleware/      # Express middleware (auth, error handling)
│   ├── models/          # Mongoose schemas (Task, User)
│   ├── routes/          # API route definitions (auth, tasks, users)
│   ├── index.ts         # Backend server entry point
│   ├── package.json     # Backend dependencies and scripts
│   └── tsconfig.json    # TypeScript config for backend
├── frontend/
│   ├── public/          # Static public assets (index.html, icons)
│   ├── build/           # Production build output
│   │   └── static/      # Built JS/CSS assets
│   ├── src/             # Main React app source code
│   │   ├── components/  # Reusable UI components (Header, Footer, TaskForm)
│   │   ├── context/     # React Context providers (Auth, Task)
│   │   ├── pages/       # Page components (Dashboard, Login, Register, etc.)
│   │   ├── api.ts       # API utility functions
│   │   └── ...          # Other React files (App.tsx, index.tsx, etc.)
│   ├── package.json     # Frontend dependencies and scripts
│   ├── tailwind.config.js # Tailwind CSS config
│   └── tsconfig.json    # TypeScript config for frontend
└── README.md            # Project documentation
```

### Folder & File Overview

- **backend/**: Node.js/Express API with TypeScript, MongoDB, JWT auth, and REST endpoints.
   - `controllers/`: Handles business logic for authentication and tasks.
   - `middleware/`: Auth and error handling middleware.
   - `models/`: Mongoose schemas for User and Task.
   - `routes/`: API route definitions for auth, tasks, and users.
   - `index.ts`: Main server file.
   - `package.json`, `tsconfig.json`: Backend config and dependencies.
- **frontend/**: React app with TypeScript, Tailwind CSS, and context-based state management.
   - `public/`: Static files and HTML template.
   - `build/`: Production build output (auto-generated).
   - `src/`: Main app code (components, context, pages, API helpers).
   - `package.json`, `tsconfig.json`, `tailwind.config.js`: Frontend config and dependencies.
- **README.md**: Project documentation (this file).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user's tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users/profile` - Get current user profile

## Features in Detail

### Task Management
- Create tasks with title, description, due date, priority, and status
- Filter tasks by status (todo, in progress, done)
- Filter tasks by priority (low, medium, high)
- Filter tasks by due date
- Search tasks by title or description

### Calendar View
- Visual calendar representation of tasks
- Color-coded by priority and status
- Month, week, and day views
- Click on events to view task details

### User Experience
- Responsive design that works on all devices
- Toast notifications for user feedback
- Loading states and empty states
- Clean and modern UI with Tailwind CSS

## Troubleshooting

### Backend won't start without internet
- **Problem**: You're using MongoDB Atlas which requires internet
- **Solution**:
  1. Install MongoDB locally (see Option 2 above)
  2. Or ensure you have internet connection for MongoDB Atlas

### MongoDB connection errors
- Check if MongoDB service is running (for local setup)
- Verify your connection string in `.env` file
- Ensure network connectivity (for Atlas)

### Frontend build errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors in the console

## Development

### Backend Development
```bash
cd backend
npm run dev  # Development with hot reload
npm run build  # Build for production
npm start  # Run production build
```

### Frontend Development
```bash
cd frontend
npm start  # Development server
npm run build  # Build for production
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, React Router, React Hook Form
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **UI Libraries**: React Toastify, React Big Calendar
- **Form Handling**: React Hook Form with validation
- **Styling**: Tailwind CSS

## License

ISC
