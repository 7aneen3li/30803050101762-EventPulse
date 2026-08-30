# EventPulse API

EventPulse is a RESTful event management API built with Node.js and Express. It provides authentication, event management, event registration, announcements, role-based access control, request validation, MongoDB persistence, and real-time communication using Socket.io.

The API is deployed on Vercel and uses MongoDB Atlas as its hosted database.

---

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – REST API framework
- **MongoDB Atlas** – Cloud-hosted database
- **Mongoose** – MongoDB object modeling
- **Socket.io** – Real-time communication
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **express-validator** – Request validation
- **Swagger / OpenAPI** – Interactive API documentation
- **Jest** – Unit and integration testing
- **Supertest** – HTTP API testing
- **Vercel** – Deployment platform

---

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Role-based access control
- Event CRUD operations
- Event filtering, pagination, sorting, and search
- Event registration and cancellation
- Registration capacity validation
- Duplicate registration prevention
- Event announcements
- Real-time announcements using Socket.io
- Request validation
- Centralized error handling
- MongoDB Atlas database integration
- Health check endpoint
- Interactive Swagger API documentation
- Automated unit and integration tests

---

## Project Structure

```text
30803050101762-EventPulse/
├── config/
│   ├── db.js
│   ├── socket.js
│   └── swagger.js
├── controllers/
│   ├── announcementController.js
│   ├── authController.js
│   ├── eventController.js
│   └── registrationController.js
├── middleware/
│   ├── errorHandler.js
│   ├── requireAuth.js
│   ├── requireRole.js
│   └── validate.js
├── models/
│   ├── category.model.js
│   ├── event.model.js
│   ├── message.model.js
│   ├── registration.model.js
│   └── user.model.js
├── routes/
│   ├── announcementRoutes.js
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
├── tests/
│   ├── integration/
│   │   └── events.test.js
│   └── unit/
│       ├── AppError.test.js
│       └── asyncHandler.test.js
├── utils/
│   ├── AppError.js
│   └── asyncHandler.js
├── postman/
│   └── EventPulse.postman_collection.json
├── app.js
├── seed.js
├── jest.config.js
├── package.json
├── package-lock.json
├── vercel.json
├── .env.example
├── .gitignore
└── README.md
```

> `.env` and `node_modules/` are intentionally not included because they are local/ignored files.

---

# Local Installation

## 1. Clone the Repository

```bash
git clone https://github.com/7aneen3li/30803050101762-EventPulse.git
cd 30803050101762-EventPulse
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

---

## 4. Seed the Database

Run:

```bash
npm run seed
```

This will populate the database with the project's sample data.

---

## 5. Start the Development Server

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:3000
```

---

# API Documentation

Interactive Swagger / OpenAPI documentation is available at:

```text
/api-docs
```

Local:

```text
http://localhost:3000/api-docs
```

Live:

https://30803050101762-event-pulse.vercel.app/api-docs/

Swagger provides interactive documentation for the API endpoints and allows endpoints to be tested directly from the browser.

---

# API Endpoints

## Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks whether the server is running and reports database connection status |

Example response:

```json
{
  "status": "success",
  "database": "connected"
}
```

---

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login an existing user |
| GET | `/api/auth/me` | Get the currently authenticated user |

### Register

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get an event by ID |
| POST | `/api/events` | Create a new event |
| PATCH | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |

### Create Event

```http
POST /api/events
```

Requires authentication and admin role.

Request body:

```json
{
  "title": "Technology Conference",
  "category": "CATEGORY_ID",
  "date": "2026-12-01T10:00:00.000Z",
  "capacity": 100
}
```

### Update Event

```http
PATCH /api/events/:id
```

Requires authentication and admin role.

Request body can contain:

```json
{
  "title": "Updated Event Title",
  "category": "CATEGORY_ID",
  "date": "2026-12-02T10:00:00.000Z",
  "capacity": 150
}
```

---

## Registrations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/registrations` | Register the current user for an event |
| GET | `/api/registrations/my` | Get the current user's registrations |
| DELETE | `/api/registrations/:id` | Cancel a registration |

### Register for an Event

```http
POST /api/registrations
```

Requires authentication.

Request body:

```json
{
  "event": "EVENT_ID"
}
```

---

## Announcements

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/announcements` | Create an announcement |
| GET | `/api/announcements/:eventId` | Get announcements for an event |

### Create Announcement

```http
POST /api/announcements
```

Requires authentication and admin role.

Request body:

```json
{
  "eventId": "EVENT_ID",
  "text": "The event will start at 10 AM."
}
```

---

# Authentication

Protected endpoints require a valid JWT authentication token.

The token should be sent using the `Authorization` header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Admin-only endpoints additionally require the authenticated user to have the `admin` role.

---

# Validation

The API uses `express-validator` to validate incoming request data.

Examples of validation rules include:

- Valid email address
- Password minimum length
- Required fields
- Valid MongoDB ObjectIds
- Valid ISO date values
- Positive event capacity

Invalid requests return appropriate validation error responses.

---

# Testing

The project uses Jest and Supertest for automated testing.

Run all tests with:

```bash
npm test
```

The test suite includes:

- Unit tests for application errors
- Unit tests for async handlers
- Integration tests for Events API

---

# Database

The project uses MongoDB Atlas as the production database.

The MongoDB connection string is provided through the `MONGO_URI` environment variable.

---

# Deployment

The API is deployed using Vercel.

## Live API

https://30803050101762-event-pulse.vercel.app

## Health Check

https://30803050101762-event-pulse.vercel.app/health

The health endpoint confirms that the deployed server is running and reports the MongoDB connection status.

## Swagger Documentation

https://30803050101762-event-pulse.vercel.app/api-docs/

---

# Git Workflow

The project follows Conventional Commits.

Examples:

```text
feat: add event routes
fix: initialize database connection for vercel
docs: document api endpoints with swagger
test: add integration tests for Events API
refactor: wire auth routes and error handler into app.js
```

The repository includes the required release tag:

```text
v1.0.0
```

---

# Project Review Links

## GitHub Repository

https://github.com/7aneen3li/30803050101762-EventPulse.git

## Live Deployment

https://30803050101762-event-pulse.vercel.app

## API Documentation

https://30803050101762-event-pulse.vercel.app/api-docs/

## Health Check

https://30803050101762-event-pulse.vercel.app/health