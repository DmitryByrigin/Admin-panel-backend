import { UserService } from 'src/user/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ExtractId } from '../decorators/extractId';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post('changePass')
  async changePassword(
    @ExtractId() userId: string,
    @Body() body: ChangePasswordDto,
  ) {
    const { currentPass, newPass, confirmPass } = body;
    console.log(userId + 'USERID');
    return await this.userService.changePassword(
      userId,
      currentPass,
      newPass,
      confirmPass,
    );
  }

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profileImages', // путь к папке загрузки
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadProfileImage(
    @ExtractId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file.filename;
    return await this.userService.updateProfileImage(userId, image);
  }

  // @UseGuards(JwtGuard)
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(@UploadedFile() file): Observable<object> {
  //   console.log(typeof file?.filename);
  //   return of({ imagePath: file.path });
  // }
  // @Get('profile-image/:imagename')
  // findProfileImage(
  //   @Param('imagename') imagename,
  //   @Res() res,
  // ): Observable<object> {
  //   return of(
  //     res.sendfile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
  //   );
  // }
}
