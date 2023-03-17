import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaService } from 'prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async CreatePost(createPostDto: PostDto) {
    const { title, content, authorId } = createPostDto;
    const newPost = await this.prisma.post.create({
      data: { title, content, author: { connect: { id: authorId } } },
    });

    console.log(newPost);

    return {
      message: 'Post created successfully!!',
      result: newPost,
    };
  }

  async updatePost(id: string, updatePostDto: PostDto) {
    const { title, content, authorId } = updatePostDto;
    const updatedPost = await this.prisma.post
      .update({
        where: { id },
        data: { title, content, author: { connect: { id: authorId } } },
      })
      .catch((err) => console.log(err));

    //console.log(updatedPost);

    return {
      message: 'Post updated successfully!!',
      result: updatedPost,
    };
  }
  async deletePost(id: string, deletePostDto: PostDto) {
    const deletedPost = await this.prisma.post.delete({ where: { id } });

    return {
      message: 'Post was deleted!!',
      result: deletedPost,
    };
  }

  async getAll() {
    const posts = await this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return posts;
  }

  async getPostById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    return post;
  }
}
