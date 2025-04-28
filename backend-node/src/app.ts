import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { errorHandler } from '@/middleware/errorMiddleware';
import authRoutes from '@/routes/authRoutes';
import docRoutes from '@/routes/docRoutes';
import userRoutes from '@/routes/userRoutes';
import ingestionRoutes from '@/routes/ingestionRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

dotenv.config();

const app = express();

// 🔒 Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(compression());
app.use(express.json());
app.use(morgan('combined'));

// ✅ Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (_: Request, res: Response) => {
  res.status(200).send('🔥 API Live');
});
app.use('/auth', authRoutes);
app.use('/documents', docRoutes);
app.use('/users', userRoutes);
app.use('/investigations', ingestionRoutes);

// ❌ Global Error Handler
app.use(errorHandler);
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

export { app };
