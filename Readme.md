# Express TypeScript Backend

A RESTful API backend built with Express.js and TypeScript.

## Features

- TypeScript support
- Express.js framework
- CORS enabled
- Environment variables with dotenv
- Structured project layout
- Basic CRUD operations
- Request logging middleware
- Error handling middleware
- In-memory data store (can be extended to use a database)

## Project Structure

```
backend/
├── src/
│   ├── config/      # Application configuration
│   ├── controllers/ # Request handlers
│   ├── middleware/  # Express middleware
│   ├── models/      # Data models
│   ├── routes/      # Route definitions
│   ├── utils/       # Utility functions
│   └── index.ts     # Application entry point
├── .env             # Environment variables
├── package.json     # Project metadata and dependencies
└── tsconfig.json    # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot-reload
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

### Base Routes

- `GET /api` - Welcome message
- `GET /api/health` - Health check

### User Routes

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update an existing user
- `DELETE /api/users/:id` - Delete a user

## Environment Variables

Copy `.env.example` to `.env` and customize as needed:

```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*
```
