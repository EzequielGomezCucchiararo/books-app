import { UserRepository } from '../domain';
import { InvalidCredentialsError } from '../domain/errors';

export class SignIn {
  private readonly _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw InvalidCredentialsError.create();
    }
  }
}
