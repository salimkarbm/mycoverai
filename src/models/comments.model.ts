import {
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Table,
} from 'sequelize-typescript';
import { Post } from './posts.model';
import { User } from './users.model';

@Table
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  // Define associations with Post
  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  // Define associations with User
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
