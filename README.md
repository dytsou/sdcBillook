# SDC Billook

A modern bill management and tracking application built with React and Node.js.

## Project Overview

SDC Billook is a full-stack web application that helps users manage and track their bills. The application is built with a React frontend and a Node.js/Express backend with GraphQL API.

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- TailwindCSS for styling
- React Icons

### Backend
- Node.js with Express
- GraphQL with express-graphql
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
.
├── billook/          # Frontend React application
│   ├── src/          # Source code
│   ├── public/       # Public assets
│   └── ...
│
└── backend/          # Backend Node.js application
    ├── models/       # MongoDB models
    ├── middleware/   # Express middleware
    ├── graphql/      # GraphQL schemas and resolvers
    └── ...
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sdcBillook.git
cd sdcBillook
```

2. Install frontend dependencies:
```bash
cd billook
pnpm install
```

3. Install backend dependencies:
```bash
cd ../backend
pnpm install
```

4. Create a `.env` file in the backend directory with your environment variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
pnpm run dev
```

2. Start the frontend development server:
```bash
cd billook
pnpm start
```

The frontend application will be available at `http://localhost:3000` and the backend GraphQL API at `http://localhost:4000/graphql`.

## Features

- User authentication and authorization
- Bill management and tracking
- GraphQL API for efficient data fetching
- Responsive design with TailwindCSS
- Secure password hashing and JWT authentication
