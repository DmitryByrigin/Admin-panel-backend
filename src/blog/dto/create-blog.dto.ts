import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  image: string;

  @IsString()
  title: string;

  @IsOptional()
  content?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  categories: string[];

  userId: string;
}
