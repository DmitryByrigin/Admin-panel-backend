import { UserService } from 'src/user/user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.findById(id);
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
