import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() commentData: CreateCommentDto) {
    const comment = await this.commentService.create(commentData);
    if (comment) {
      return comment;
    }
    throw new HttpException(
      'Unable to Post Comment. Please try again later!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
