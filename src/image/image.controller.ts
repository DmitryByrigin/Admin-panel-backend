import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { ImageService } from './image.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file): Observable<object> {
    console.log(file);
    return of({ imagePath: file.path });
  }

  @Get('profile/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<object> {
    return of(
      res.sendfile(join(process.cwd(), 'uploads/profileImages/' + imagename)),
    );
  }

  @Get('blog/:imagename')
  findPostImage(@Param('imagename') imagename, @Res() res): Observable<object> {
    return of(
      res.sendfile(join(process.cwd(), 'uploads/postImages/' + imagename)),
    );
  }
}
