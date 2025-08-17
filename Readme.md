# Placement Backend

A comprehensive Node.js/Express backend server for placement management with JWT authentication, user management, and role-based access control.

## Features

- ✅ **User Authentication**: Register, login, logout with JWT tokens
- ✅ **Token Management**: Access tokens with refresh token rotation
- ✅ **Role-Based Access**: Support for student, admin, and recruiter roles
- ✅ **Password Security**: Bcrypt hashing with pre-save hooks
- ✅ **Request Validation**: Comprehensive input validation and sanitization
- ✅ **Session Management**: Refresh token storage and management
- ✅ **Middleware**: Authentication and authorization middleware
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Error Handling**: Comprehensive error handling and responses

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: Custom validation utilities

## Project Structure

```
src/
├── config/
│   └── index.ts          # Application configuration
├── controllers/
│   └── auth.controller.ts # Authentication controllers
├── middleware/
│   ├── index.ts          # Middleware exports
│   └── auth.ts           # Authentication middleware
├── models/
│   └── index.ts          # Database models (User, Session, etc.)
├── routes/
│   └── auth.routes.ts    # Authentication routes
├── utils/
│   ├── index.ts          # Utility exports
│   ├── connection.ts     # Database connection
│   ├── jwt.ts            # JWT utility functions
│   └── validation.ts     # Request validation utilities
├── index.ts              # Application entry point
└── server.ts             # Express server setup
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd placement-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update environment variables in `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/placement-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

5. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication Routes

All authentication routes are prefixed with `/api/auth`

#### Public Routes

| Method | Endpoint                            | Description                     | Body                                           |
| ------ | ----------------------------------- | ------------------------------- | ---------------------------------------------- |
| POST   | `/register`                         | Register new user               | `{ email, password, username?, name?, role? }` |
| POST   | `/login`                            | User login                      | `{ email, password }`                          |
| POST   | `/refresh-token`                    | Refresh access token            | `{ refreshToken }`                             |
| POST   | `/logout`                           | Logout user                     | `{ refreshToken }`                             |
| GET    | `/check-email/:email`               | Check if email exists           | -                                              |
| GET    | `/check-email-verification/:userId` | Check email verification status | -                                              |

#### Protected Routes

| Method | Endpoint      | Description             | Headers                         |
| ------ | ------------- | ----------------------- | ------------------------------- |
| GET    | `/profile`    | Get user profile        | `Authorization: Bearer <token>` |
| POST   | `/logout-all` | Logout from all devices | `Authorization: Bearer <token>` |

### Request/Response Examples

#### Register User

**Request:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "username": "johndoe",
  "name": "John Doe",
  "role": "student"
}
```

**Response:**

```json
{
	"message": "User registered successfully",
	"user": {
		"id": "64a1b2c3d4e5f6g7h8i9j0k1",
		"username": "johndoe",
		"name": "John Doe",
		"email": "user@example.com",
		"role": "student",
		"emailVerified": null,
		"profileImage": null,
		"createdAt": "2024-01-01T00:00:00.000Z"
	},
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User

**Request:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
	"message": "Login successful",
	"user": {
		"id": "64a1b2c3d4e5f6g7h8i9j0k1",
		"username": "johndoe",
		"name": "John Doe",
		"email": "user@example.com",
		"role": "student",
		"emailVerified": null,
		"profileImage": null,
		"lastLoginAt": "2024-01-01T12:00:00.000Z"
	},
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Profile

**Request:**

```bash
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
	"user": {
		"id": "64a1b2c3d4e5f6g7h8i9j0k1",
		"username": "johndoe",
		"name": "John Doe",
		"email": "user@example.com",
		"role": "student",
		"emailVerified": null,
		"profileImage": null,
		"lastLoginAt": "2024-01-01T12:00:00.000Z",
		"createdAt": "2024-01-01T00:00:00.000Z",
		"updatedAt": "2024-01-01T12:00:00.000Z"
	}
}
```

## User Roles

The system supports three user roles:

- **student**: Default role for regular users
- **admin**: Administrative privileges
- **recruiter**: Company recruiter access

## Security Features

### Password Requirements

- Minimum 8 characters
- Maximum 128 characters
- At least one number
- At least one letter
- At least one special character

### JWT Token Strategy

- **Access Token**: Short-lived (15 minutes) for API access
- **Refresh Token**: Long-lived (7 days) for token renewal
- **Token Rotation**: New refresh token issued on each refresh
- **Secure Storage**: Refresh tokens stored in database with expiration

### Validation

- Email format validation
- Password strength validation
- Username format validation (alphanumeric, underscore, hyphen only)
- Input sanitization and type checking

## Middleware

### Authentication Middleware

- `authenticateToken`: Verifies JWT access token
- `authorizeRoles(...roles)`: Restricts access to specific roles
- `optionalAuth`: Optional authentication for public endpoints

### Validation Middleware

- Request validation with custom rules
- Type checking and sanitization
- Comprehensive error messages

## Development

### Scripts

```bash
npm run dev     # Start development server with hot reload
npm start       # Start production server
npm test        # Run tests (to be implemented)
```

### Code Style

- TypeScript strict mode enabled
- Consistent error handling patterns
- Comprehensive type definitions
- Clear separation of concerns

## Error Handling

The API returns consistent error responses:

```json
{
	"error": "Error message",
	"details": ["Detailed error information"] // Optional
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

## Environment Variables

| Variable                 | Description               | Default                                  |
| ------------------------ | ------------------------- | ---------------------------------------- |
| `PORT`                   | Server port               | `5000`                                   |
| `NODE_ENV`               | Environment mode          | `development`                            |
| `MONGODB_URI`            | MongoDB connection string | `mongodb://localhost:27017/placement-db` |
| `JWT_SECRET`             | JWT signing secret        | Required                                 |
| `JWT_REFRESH_SECRET`     | Refresh token secret      | Required                                 |
| `JWT_EXPIRES_IN`         | Access token expiry       | `15m`                                    |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry      | `7d`                                     |
| `CORS_ORIGIN`            | Allowed CORS origins      | `*`                                      |

## Database Models

### User Model

```typescript
{
  _id: ObjectId,
  name?: string,
  username?: string,
  email: string,
  password: string, // hashed
  profileImage?: string,
  role: "student" | "admin" | "recruiter",
  loginMethods: string[],
  emailVerified?: Date,
  lastLoginAt?: Date,
  isBlocked: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Session Model

```typescript
{
  userId: ObjectId,
  refreshToken: string,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Future Enhancements

- [ ] Email verification system
- [ ] Password reset functionality
- [ ] OAuth integration (Google, LinkedIn)
- [ ] Rate limiting
- [ ] Account lockout after failed attempts
- [ ] Audit logging
- [ ] File upload for profile images
- [ ] Multi-factor authentication

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the ISC License.

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
