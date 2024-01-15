import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from '../image/image.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService, ImageService],
})
export class BlogModule {}
