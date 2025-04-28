import request from 'supertest';
import { app } from '@/app';
import { sequelize } from '@/dbConfig';

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User Routes', () => {
  it('✅ should create a new user', async () => {
    const res = await request(app)
      .post('/auth/register') // 🛠 Correct route because /users POST nahi hai
      .send({
        email: `test${Date.now()}@example.com`,
        password: 'password123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
  });

  it('❌ should fail creating user with missing fields', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('✅ should fetch all users', async () => {
    const tokenRes = await request(app)
      .post('/auth/register')
      .send({
        email: `fetch${Date.now()}@example.com`,
        password: 'password123',
      });

    const token = tokenRes.body.token;

    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
