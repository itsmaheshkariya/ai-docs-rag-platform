import { Sequelize } from 'sequelize-typescript'
import { User } from './models/User'
import { Document } from './models/Document'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  password: 'mypass',
  database: 'doc_rag_app',
  models: [User, Document],
  logging: false,
})