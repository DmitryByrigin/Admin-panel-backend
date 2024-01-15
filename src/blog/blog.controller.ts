import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ImageService } from '../image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private imageService: ImageService,
  ) {}

  @Get()
  async getAllPostsAfterFiltering(
    @Query('sortType') sortType: string,
    @Query('sortBy') sortBy: string,
  ): Promise<any> {
    if (sortType && !['asc', 'desc'].includes(sortType.toLowerCase())) {
      throw new BadRequestException(
        'Неверное значение sortType. Используйте "asc" или "desc".',
      );
    }

    const orderBy: {
      createdAt?: 'asc' | 'desc';
      like?: 'asc' | 'desc';
      views?: 'asc' | 'desc';
    } = {};

    if (sortBy) {
      switch (sortBy.toLowerCase()) {
        case 'like':
          orderBy.like =
            sortType && sortType.toLowerCase() === 'asc' ? 'asc' : 'desc';
          break;
        case 'views':
          orderBy.views =
            sortType && sortType.toLowerCase() === 'asc' ? 'asc' : 'desc';
          break;
      }
    } else {
      orderBy.createdAt =
        sortType && sortType.toLowerCase() === 'asc' ? 'asc' : 'desc';
    }

    return this.blogService.findAllByFiltered({
      orderBy,
    });
  }
  @UseGuards(JwtGuard)
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(file);
    const ownerId = res.locals.id;

    if (ownerId) {
      createBlogDto.userId = ownerId;

      try {
        const { filename } = await this.imageService.uploadImage(file);
        createBlogDto.image = filename;
        const data = await this.blogService.create(createBlogDto);
        if (data) {
          res.status(200).json(data);
        }
        return data;
      } catch (error) {
        console.error('Error while creating blog:', error);
        throw error;
      }
    }
  }

  @UseGuards(JwtGuard)
  @Post(':id/like')
  async addLike(@Res() res: Response, @Param('id') id: string) {
    try {
      const ownerId = res.locals.id;
      const countLikes = await this.blogService.addLike(+id, ownerId);

      if (countLikes !== undefined) {
        return res.status(200).json({ countLikes });
      } else {
        return res
          .status(500)
          .json({ message: 'Не удалось получить количество лайков' });
      }
    } catch (error) {
      console.error('Ошибка в addLike:', error);
      return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  }

  @UseGuards(JwtGuard)
  @Post(':id/view')
  async addView(@Res() res: Response, @Param('id') id: string) {
    const ownerId = res.locals.id;
    const data = await this.blogService.addNewView(+id, ownerId);
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
  // BlogController

  @UseGuards(JwtGuard)
  @Post(':id/comments')
  @UsePipes(ValidationPipe)
  async addComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Res() res: Response,
  ) {
    const user = res.locals.id;
    try {
      if (!user || !user) {
        throw new ConflictException("You can't add a comment!");
      }
      const data = await this.blogService.addComment(+id, createCommentDto);
      if (data) {
        return res.status(200).json(data);
      } else {
        throw new ConflictException('Failed to add a comment!');
      }
    } catch (error) {
      console.error('Error in addComment:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Get(':id/comments')
  async getCommentsForBlogPost(@Param('id') id: string, @Res() res: Response) {
    try {
      const comments = await this.blogService.getCommentsForBlogPost(+id);

      // const commentsWithUser = comments.map((comment) => ({
      //   ...comment,
      //   user: {
      //     name: comment.user.name,
      //     surname: comment.user.surname,
      //   },
      // }));

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Ошибка в getCommentsForBlogPost:', error);
      return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  }
  // @UseGuards(JwtGuard)
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(@UploadedFile() file): Observable<object> {
  //   console.log(file);
  //   return of({ imagePath: file.path });
  // }
}
