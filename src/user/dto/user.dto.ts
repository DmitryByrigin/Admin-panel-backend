import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  profileImage: string;
}

export class CreateUserGoogleDto {
  @IsEmail()
  email: string;

  @IsString()
  profileImage: string;
}
