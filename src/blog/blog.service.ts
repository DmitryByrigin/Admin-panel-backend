import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBlogDto) {
    const blog = await this.prisma.blog.create({
      data: {
        image: dto.image,
        title: dto.title,
        content: dto.content,
        categories: dto.categories,
        userId: dto.userId,
      },
    });

    return blog;
  }

  async findAll() {
    return await this.prisma.blog.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  async remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
