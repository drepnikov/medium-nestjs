import { UserType } from 'src/modules/user/types/user.type';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
