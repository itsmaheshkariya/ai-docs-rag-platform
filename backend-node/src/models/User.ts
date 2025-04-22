import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Document } from './Document';

@Table
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash!: string;

  @Column({ type: DataType.STRING, defaultValue: 'user' })
  role!: string;

  @HasMany(() => Document)
  documents!: Document[];
}
