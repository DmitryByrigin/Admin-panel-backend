import { IsString, IsEmail, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}

export class CreateUserGoogleDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
