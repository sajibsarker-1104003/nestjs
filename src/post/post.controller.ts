import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  createPost(@Body() createPostDto: PostDto) {
    return this.postService.CreatePost(createPostDto);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: PostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string, @Body() deletePostDto: PostDto) {
    return this.postService.deletePost(id, deletePostDto);
  }

  @Get('getall')
  getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
