import { SignUpController } from './controllers';
import { UserFactory } from '../domain/UserFactory';
import { JsonUserRepository } from '../infra';
import { UuidGenerator } from '../../shared';
import { SignUp } from '../application';
import { UserMapper } from '../infra/mappers';

export function bootstrap() {
  const uuidGenerator = new UuidGenerator();
  const userFactory = new UserFactory(uuidGenerator);
  const userMapper = new UserMapper();
  const userRepository = new JsonUserRepository(userFactory, userMapper);
  const signUp = new SignUp(userFactory, userRepository);
  const signUpController = new SignUpController(signUp);

  return {
    signUpHandler: signUpController.execute.bind(signUpController),
  };
}
