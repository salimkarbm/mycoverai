import { Module } from '@nestjs/common';
import { commentsProvider } from './comments.provider';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsService } from 'src/posts/posts.service';
import { postsProvider } from 'src/posts/posts.provider';

@Module({
  providers: [
    CommentsService,
    ...commentsProvider,
    ...postsProvider,
    PostsService,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
