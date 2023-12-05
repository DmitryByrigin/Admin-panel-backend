import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, BlogModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
