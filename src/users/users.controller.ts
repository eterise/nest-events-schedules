import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('create')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
