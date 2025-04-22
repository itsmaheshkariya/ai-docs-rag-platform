import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Document extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, defaultValue: 'PROCESSING' })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ownerId!: number;

  @BelongsTo(() => User)
  owner!: User;
}
