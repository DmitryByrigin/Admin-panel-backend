import { PrismaService } from './../prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    console.log(user);
    // 1
    if (user) throw new ConflictException('email dublicated');
    const pass = await hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: pass,
      },
    });

    const { password, ...result } = newUser;
    return result;
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
