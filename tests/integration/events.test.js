require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const connectDB = require('../../config/db');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Events API', () => {
  it('GET /api/events returns 200 and an array of events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/events without a token returns 401', async () => {
    const res = await request(app).post('/api/events').send({
      title: 'Test Event',
      category: '64f0a1b2c3d4e5f678901234',
      date: '2026-12-01',
      capacity: 10,
    });
    expect(res.statusCode).toBe(401);
  });

  it('POST /api/events with missing required fields returns 422', async () => {
    // Must log in first — requireAuth runs before validation in the route chain,
    // so an unauthenticated request would 401 before ever reaching the validator.
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@eventpulse.com',
      password: 'Admin@123',
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(422);
  });
});