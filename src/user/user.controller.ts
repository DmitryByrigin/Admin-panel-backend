import { UserService } from 'src/user/user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
