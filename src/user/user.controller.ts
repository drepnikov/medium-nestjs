import { Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/users')
  async createUser(): Promise<any> {
    return this.userService.createUser();
  }
}
