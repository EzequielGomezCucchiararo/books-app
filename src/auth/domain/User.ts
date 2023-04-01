interface UserParams {
  id: string;
  email: string;
  password: string;
}

export class User {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private readonly _email: string;
  private readonly _password: string;

  constructor({ id, email, password }: UserParams) {
    this._id = id;
    this._createdAt = new Date();
    this._email = email;
    this._password = password;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }
}
