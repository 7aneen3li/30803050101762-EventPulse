# 30803050101762-EventPulse

Backend REST API for an event management platform — final graduation project.

## Tech Stack
Node.js, Express, MongoDB (Mongoose), Socket.io, JWT, bcryptjs, Jest, Supertest

## Live Deployment
https://your-project.vercel.app

## Local Installation
\`\`\`bash
git clone <your-repo-url>
cd 30803050101762-EventPulse
npm install
cp .env.example .env   # fill in your own values
npm run seed
npm run dev
\`\`\`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in and receive a JWT |
| GET | /api/events | List events (filter/sort/paginate/search) |
| GET | /api/events/:id | Get a single event |
| POST | /api/events | Create an event (admin only) |
| PATCH | /api/events/:id | Update an event (admin only) |
| DELETE | /api/events/:id | Delete an event (admin only) |
| POST | /api/registrations | Register for an event |
| GET | /api/registrations/my | List your own registrations |
| DELETE | /api/registrations/:id | Cancel your own registration |
| POST | /api/announcements | Send an announcement (admin only) |
| GET | /api/announcements/:eventId | Get announcement history for an event |
| GET | /health | Health check |

## Documentation
- Swagger: `/api-docs` on the live deployment
- Postman collection: see `postman/` folder