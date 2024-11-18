import { Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
  }
}
