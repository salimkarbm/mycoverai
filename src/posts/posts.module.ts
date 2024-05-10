import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProvider } from './posts.provider';

@Module({
  providers: [PostsService, ...postsProvider],
  controllers: [PostsController],
})
export class PostsModule {}
