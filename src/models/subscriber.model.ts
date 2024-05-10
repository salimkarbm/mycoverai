import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IsEmail, IsDate } from 'class-validator';
import { User } from './users.model';

@Table
export class Subscriber extends Model<Subscriber> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  @IsEmail()
  email: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @IsDate()
  subscribedAt: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
