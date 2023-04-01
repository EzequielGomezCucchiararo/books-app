import { UserRepository } from '../domain';
import { InvalidCredentialsError } from '../domain/errors';
import { PasswordEncryptor } from '../infra';

export class SignIn {
  private readonly _userRepository: UserRepository;
  private readonly _passwordEncryptor: PasswordEncryptor;

  constructor(
    userRepository: UserRepository,
    passwordEncryptor: PasswordEncryptor,
  ) {
    this._userRepository = userRepository;
    this._passwordEncryptor = passwordEncryptor;
  }

  async execute(email: string, password: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (
      !user ||
      !(await this._passwordEncryptor.verifyPassword(password, user.password))
    ) {
      throw InvalidCredentialsError.create();
    }
  }
}
