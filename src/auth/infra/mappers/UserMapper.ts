import { User } from '../../domain/User';

export interface UserData {
  id: string;
  email: string;
  password: string;
}

export class UserMapper {
  mapUserToUserData(user: User): UserData {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
    };
  }
}
