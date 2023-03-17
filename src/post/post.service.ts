import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaService } from 'prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async CreatePost(dto: PostDto) {
    const { title, content, authorId } = dto;
    const newPost = await this.prisma.post.create({
      data: { title, content, author: { connect: { id: authorId } } },
    });

    console.log(newPost);

    return {
      message: 'Post created successfully!!',
      result: newPost,
    };
  }

  async signin(dto: PostDto) {
    return {
      message: 'Signin was successfull',
    };
  }
  async signout() {
    return {
      message: 'Signout was successfull',
    };
  }

  async getAll() {
    return {
      message: 'get all',
    };
  }
}
