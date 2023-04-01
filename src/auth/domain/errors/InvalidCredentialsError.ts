export class InvalidCredentialsError extends Error {
  private constructor() {
    super(
      `The email address or password you provided is incorrect. Please try again`,
    );

    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }

  static create() {
    return new InvalidCredentialsError();
  }
}
