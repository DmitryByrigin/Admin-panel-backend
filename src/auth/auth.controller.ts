import { CreateUserDto, CreateUserGoogleDto } from 'src/user/dto/user.dto';
import { UserService } from '../user/user.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';

import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  // @Post('google')
  // async registerGoogleUser(@Body() user: any) {
  //   return await this.userService.createGoogleUser(user);
  // }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('google')
  async loginGoogle(@Body() dto: CreateUserGoogleDto) {
    console.log('google');

    return await this.authService.googleLogin(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrashToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
