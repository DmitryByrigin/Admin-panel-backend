import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateBlogDto {
  image: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  categories: string[];

  userId: string;
}
