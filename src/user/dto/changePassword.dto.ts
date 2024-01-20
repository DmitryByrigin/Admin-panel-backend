import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  currentPass: string;

  @IsString()
  newPass: string;

  @IsString()
  confirmPass: string;
}
