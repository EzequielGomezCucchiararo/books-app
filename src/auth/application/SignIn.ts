import jwt from 'jsonwebtoken';
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

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this._userRepository.findByEmail(email);

    if (
      !user ||
      !(await this._passwordEncryptor.verifyPassword(password, user.password))
    ) {
      throw InvalidCredentialsError.create();
    }

    // TODO: Encapsulate it and pass it as dependency
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
    );

    return { token };
  }
}
