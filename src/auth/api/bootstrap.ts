import { SignUpController } from './controllers';
import { UserFactory } from '../domain';
import { JsonUserRepository, PasswordEncryptor } from '../infra';
import { UuidGenerator } from '../../shared';
import { SignIn, SignUp } from '../application';
import { UserMapper } from '../infra/mappers';
import { SignInController } from './controllers/SignInController';

export function bootstrap() {
  const uuidGenerator = new UuidGenerator();
  const userFactory = new UserFactory(uuidGenerator);
  const userMapper = new UserMapper();
  const passwordEncryptor = new PasswordEncryptor();
  const userRepository = new JsonUserRepository(
    userFactory,
    userMapper,
    passwordEncryptor,
  );
  const signIn = new SignIn(userRepository, passwordEncryptor);
  const signUp = new SignUp(userFactory, userRepository);
  const signInController = new SignInController(signIn);
  const signUpController = new SignUpController(signUp);

  return {
    signInHandler: signInController.execute.bind(signInController),
    signUpHandler: signUpController.execute.bind(signUpController),
  };
}
