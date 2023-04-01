import { UserFactory, UserRepository } from '../domain';
import { UserAlreadySignedUpError } from '../domain/errors';

export class SignUp {
  private readonly _userFactory: UserFactory;
  private readonly _userRepository: UserRepository;
  constructor(userFactory: UserFactory, userRepository: UserRepository) {
    this._userFactory = userFactory;
    this._userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<void> {
    const foundUser = await this._userRepository.findByEmail(email);

    if (foundUser) {
      throw UserAlreadySignedUpError.create(email);
    }

    const user = this._userFactory.createUser({ email, password });

    await this._userRepository.save(user);
  }
}
