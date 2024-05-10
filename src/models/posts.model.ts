import { User } from './users.model';
import { Comment } from './comments.model';
import {
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
  Table,
  HasMany,
} from 'sequelize-typescript';

import { PostStatus } from 'src/core/Enum';
@Table
export class Post extends Model<Post> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  content: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  })
  declineReason: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  published: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: PostStatus.DRAFT,
  })
  status: PostStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updatedAt: Date;

  @BeforeUpdate
  static updateTimestamp(post: Post): void {
    // Check if any of the post properties have changed
    if (post.changed()) {
      post.setDataValue('updatedAt', new Date());
    }
  }

  @BeforeCreate
  static setDefaultValues(post: Post): void {
    // Set default values
    post.published = false;
  }
}
