import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Res,
  ConflictException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createBlogDto: CreateBlogDto, @Res() res: Response) {
    const ownerId = res.locals.id;
    if (ownerId) {
      createBlogDto.userId = ownerId;
      console.log(createBlogDto.userId);
      const data = await this.blogService.create(createBlogDto);
      console.log(data);
      if (data) res.status(200).json(data);
      return data;
    } else throw new ConflictException("You can't create post!");
  }

  @UseGuards(JwtGuard)
  @Post(':id/like')
  async addLike(@Res() res: Response, @Param('id') id: string) {
    const ownerId = res.locals.id;
    const data = await this.blogService.addNewLike(+id, ownerId);
    if (data) res.status(200).json(data);
    return data;
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Res() res: Response,
  ) {
    // return this.blogService.update(+id, updateBlogDto);

    const ownerId = res.locals.id;
    if (ownerId) {
      updateBlogDto.userId = ownerId;
      console.log(updateBlogDto.userId);
      const data = await this.blogService.update(+id, updateBlogDto);
      console.log(data);
      if (data) res.status(200).json(data);
      return data;
    } else throw new ConflictException("You can't create post!");
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const ownerId = res.locals.id;
    console.log('ownerId', ownerId);

    const dataPost = await this.blogService.findOne(+id);

    console.log('dataPost.userId', dataPost.userId);
    console.log(dataPost.userId === ownerId);

    if (dataPost.userId === ownerId) {
      const data = await this.blogService.remove(+id);
      res.status(200).json(data);
    } else
      throw new ConflictException(
        "This post doesn't belong to you, so you can't delete it!",
      );
  }
  @UseGuards(JwtGuard)
  @Post(':id/comments')
  @UsePipes(ValidationPipe)
  async addComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Res() res: Response,
  ) {
    const ownerId = res.locals.id;
    if (ownerId) {
      createCommentDto.userId = ownerId;
      console.log(createCommentDto.userId);
      const data = await this.blogService.createComment(createCommentDto, +id);
      console.log(data);
      if (data) res.status(200).json(data);
      return data;
    } else throw new ConflictException("You can't add a comment!");
  }
}
