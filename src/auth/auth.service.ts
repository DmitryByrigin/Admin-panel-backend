import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserGoogleDto } from 'src/user/dto/user.dto';

const EXPIPE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };
    // console.log(user);
    console.log(dto);
    const tokens = await this.generateTokens(user.email, user.name, user.id);
    return {
      user,
      backendTokens: tokens,
    };
  }
  async generateTokens(email: string, name: string, id: string) {
    const payload = {
      username: email,
      id: id,
      sub: {
        name: name,
      },
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIPE_TIME),
    };
  }
  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.email,
      id: user.id,
      sub: user.sub,
    };
    const tokens = await this.generateTokens(
      user.username,
      user.sub.name,
      user.id,
    );
    return tokens;
  }

  async googleLogin(dto: CreateUserGoogleDto) {
    let user = await this.userService.findByEmail(dto.email);

    if (!user) {
      // Если пользователя нет в базе данных, создайте нового пользователя
      user = await this.userService.createGoogleUser(dto);
    }

    // console.log(user);

    // Создайте и верните токены для пользователя, как вы делаете в методе login
    const payload = {
      username: user.email,
      id: user.id,
      sub: {
        name: user.name,
      },
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1m',
      secret: process.env.jwtSecretKey,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.jwtRefreshTokenKey,
    });

    // console.log('accessToken ', accessToken);
    // console.log('refreshToken ', refreshToken);

    return {
      user,
      backendTokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + EXPIPE_TIME),
      },
    };
  }
}
