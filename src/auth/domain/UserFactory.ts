import { UuidGenerator } from '../../shared';
import { User } from './User';

interface CreateUserParams {
  id?: string;
  email: string;
  password: string;
}

export class UserFactory {
  private _uuidGenerator: UuidGenerator;

  constructor(uuidGenerator: UuidGenerator) {
    this._uuidGenerator = uuidGenerator;
  }

  public createUser(params: CreateUserParams) {
    const id = params.id ?? this._uuidGenerator.generateUuid();

    return new User({ id, email: params.email, password: params.password });
  }
}
