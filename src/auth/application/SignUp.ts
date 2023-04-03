import jwt from 'jsonwebtoken';
import { UserFactory, UserRepository } from '../domain';
import { UserAlreadySignedUpError } from '../domain/errors';

export class SignUp {
  private readonly _userFactory: UserFactory;
  private readonly _userRepository: UserRepository;
  constructor(userFactory: UserFactory, userRepository: UserRepository) {
    this._userFactory = userFactory;
    this._userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<{ token: string }> {
    const foundUser = await this._userRepository.findByEmail(email);

    if (foundUser) {
      throw UserAlreadySignedUpError.create(email);
    }

    const user = this._userFactory.createUser({ email, password });

    await this._userRepository.save(user);

    // TODO: Encapsulate it and pass it as dependency
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
    );

    return { token };
  }
}
