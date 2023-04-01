export class UserAlreadySignedUpError extends Error {
  private constructor(email: string) {
    super(
      `"${email}" email address is already associated with an existing user account`
    );

    Object.setPrototypeOf(this, UserAlreadySignedUpError.prototype);
  }

  static create(email: string) {
    return new UserAlreadySignedUpError(email);
  }
}
