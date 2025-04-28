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

describe('Auth Routes', () => {
  describe('POST /auth/register', () => {
    it('✅ should register a new user with valid email and password', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: `test_${Math.random().toString(36).substring(2)}@example.com`,
          password: 'password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email');
      expect(res.body).toHaveProperty('token');
    });

    it('❌ should NOT register user with missing email', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          password: 'password123',
        });

      expect(res.statusCode).toBe(400);
    });

    it('❌ should NOT register user with missing password', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: `test_${Math.random().toString(36).substring(2)}@example.com`,
        });

      expect(res.statusCode).toBe(400);
    });

    it('❌ should NOT register duplicate email', async () => {
      const email = `test_${Math.random().toString(36).substring(2)}@example.com`;

      await request(app).post('/auth/register').send({
        email,
        password: 'password123',
      });

      const res = await request(app).post('/auth/register').send({
        email,
        password: 'password123',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error', 'Email already exists');
    });
  });

  describe('POST /auth/login', () => {
    it('✅ should login with correct credentials', async () => {
      const email = `test_${Math.random().toString(36).substring(2)}@example.com`;

      await request(app).post('/auth/register').send({
        email,
        password: 'password123',
      });

      const res = await request(app).post('/auth/login').send({
        email,
        password: 'password123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('❌ should NOT login with wrong password', async () => {
      const email = `test_${Math.random().toString(36).substring(2)}@example.com`;

      await request(app).post('/auth/register').send({
        email,
        password: 'password123',
      });

      const res = await request(app).post('/auth/login').send({
        email,
        password: 'wrongpassword',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('❌ should NOT login with non-existing user', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'nonexist@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
});
