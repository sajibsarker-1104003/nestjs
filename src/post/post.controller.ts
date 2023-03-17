import { Body, Controller, Post, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  signup(@Body() dto: PostDto) {
    return this.postService.CreatePost(dto);
  }

  @Post('signin')
  signin(@Body() dto: PostDto) {
    return this.postService.signin(dto);
  }

  @Get('signout')
  signout() {
    return this.postService.signout();
  }

  @Get('getall')
  getAll() {
    return this.postService.getAll();
  }
}
