import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService],
})
export class ImageModule {}
