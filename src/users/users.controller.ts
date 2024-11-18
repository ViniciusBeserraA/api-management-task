import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() user: UserDto) {
    this.userService.create(user);
  }
}
