import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { COMMENT_REPOSITORY } from 'src/core/constants';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment } from 'src/models/comments.model';
import { PostsService } from 'src/posts/posts.service';
@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: typeof Comment,
    private readonly postService: PostsService,
  ) {}

  async create(commentData: CreateCommentDto): Promise<Comment> {
    const post = await this.postService.findOne(commentData.postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const comment = await this.commentRepository.create(commentData);
    return await comment.save();
  }
}
