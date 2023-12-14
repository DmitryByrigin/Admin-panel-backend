import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { string } from 'zod';

@Injectable()
export class BlogService {
  addComment(arg0: number, createCommentDto: CreateCommentDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        image: dto.image,
        title: dto.title,
        content: dto.content,
        categories: dto.categories,
        userId: dto.userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.blog.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateBlogDto) {
    return this.prisma.blog.update({
      data: {
        title: dto.title,
        image: dto.image,
        content: dto.content,
        categories: dto.categories,
        userId: dto.userId,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }

  async createComment(dto: CreateCommentDto, id: number) {
    return this.prisma.comment.create({
      data: {
        blogId: id,
        text: dto.text,
        userId: dto.userId,
      },
    });
  }

  async addNewLike(id: number, userId: string) {
    const blogInfo = await this.prisma.blog.findUnique({ where: { id } });
    if (blogInfo.like.includes(userId)) {
      blogInfo.like.filter((user) => userId !== user);
      return this.prisma.blog.update({
        data: {
          like: blogInfo.like.filter((user) => userId !== user),
        },
        where: {
          id,
        },
      });
    } else {
      blogInfo.like.push(userId);
      return this.prisma.blog.update({
        data: {
          like: blogInfo.like,
        },
        where: {
          id,
        },
      });
    }
  }
}
