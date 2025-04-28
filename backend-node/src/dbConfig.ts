import { Sequelize } from 'sequelize-typescript'
import { User } from './models/User'
import { Document } from './models/Document'
import dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [User, Document],
  logging: false,
})