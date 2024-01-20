import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { PasswordMismatchException } from '../../exceptions/passwordMismatchException';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) throw new ConflictException('email dublicated');
    const pass = await hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        surname: dto.surname,
        password: pass,
      },
    });
    const { password, ...result } = newUser;
    return result;
  }

  async createGoogleUser(user: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) return existingUser;

    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        surname: user.surname || '',
        // googleId: user.id,
        password: '', // add a default password value
      },
    });

    return newUser;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    console.log(id);
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async changePassword(
    userId: string,
    currentPass: string,
    newPass: string,
    confirmPass: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException();

    const isMatch = await compare(currentPass, user.password);

    if (!isMatch) throw new PasswordMismatchException();

    if (newPass !== confirmPass) throw new PasswordMismatchException();

    const hashedNewPass = await hash(newPass, 10);

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedNewPass,
      },
    });
  }

  async updateProfileImage(userId: string, image: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { profileImage: image },
    });
  }
}
