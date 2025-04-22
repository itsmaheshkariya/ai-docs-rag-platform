import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { sequelize } from './config';
import authRoutes from './routes/authRoutes';
import docRoutes from './routes/docRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🔒 Security + Performance Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(compression());
app.use(express.json());
app.use(morgan('combined'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ✅ Routes
app.get('/', (_: Request, res: Response) => {
  res.status(200).send('🔥 API Live');
});
app.use('/auth', authRoutes);
app.use('/documents', docRoutes);

// ❌ Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 🚀 Start Server After DB Sync
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // use sync({ alter: true }) or migrations in real projects
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
