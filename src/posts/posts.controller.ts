import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Param,
  Delete,
  Put,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, DeclinePostDto } from './dto/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() postData: CreatePostDto) {
    const post = await this.postService.create(postData);
    if (post) {
      return post;
    }
    throw new HttpException(
      'Unable to create Post. Please try again later!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param('id') id: string,
    @Body() newData: Partial<CreatePostDto>,
  ) {
    return await this.postService.update(+id, newData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.postService.remove(Number(id));
  }

  @Patch('/decline')
  @HttpCode(HttpStatus.OK)
  async decline(@Body() newData: DeclinePostDto) {
    return await this.postService.decline(newData);
  }

  @Patch('/approve/:id')
  @HttpCode(HttpStatus.OK)
  async approve(@Param('id') id: string) {
    return await this.postService.approve(+id);
  }
}
