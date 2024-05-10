import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Post } from '../models/posts.model';
import { POST_REPOSITORY } from 'src/core/constants';
import { CreatePostDto, DeclinePostDto } from './dto/posts.dto';
import { User } from 'src/models/users.model';
import { Comment } from 'src/models/comments.model';
import { PostStatus } from 'src/core/Enum';
@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  async create(postData: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.create({
      ...postData,
      status: PostStatus.PENDING_REVIEW,
    });
    return await post.save();
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll({
      where: { published: true },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        Comment,
      ],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        Comment,
      ],
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async update(id: number, newData: Partial<Post>): Promise<[number, Post[]]> {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const [affectedCount] = await this.postRepository.update(newData, {
      where: { id },
    });
    const updatedPosts = await this.postRepository.findAll({ where: { id } });
    return [affectedCount, updatedPosts];
  }

  async remove(id: number): Promise<number> {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return await this.postRepository.destroy({ where: { id } });
  }

  async approve(id: number): Promise<[number, Post[]]> {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const [, [approvedPost]] = await this.postRepository.update(
      { status: PostStatus.APPROVED, published: true },
      { where: { id }, returning: true },
    );
    return [, [approvedPost]];
  }

  async decline(newData: DeclinePostDto): Promise<[number, Post[]]> {
    const post = await this.postRepository.findByPk(newData.postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const [affectedCount] = await this.postRepository.update(
      { status: PostStatus.REJECTED, declineReason: newData.reason },
      { where: { id: newData.postId } },
    );
    const updatedPosts = await this.postRepository.findAll({
      where: { id: newData.postId },
    });
    return [affectedCount, updatedPosts];
  }
}
