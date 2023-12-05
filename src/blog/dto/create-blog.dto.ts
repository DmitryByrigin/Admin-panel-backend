import { Prisma } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsJSON,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  //TODO JSON
  @IsOptional()
  content?: Prisma.InputJsonObject;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  categories: string[];

  @IsString()
  userId: string;
}
