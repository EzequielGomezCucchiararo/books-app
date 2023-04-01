import bcrypt from 'bcrypt';

export class PasswordEncryptor {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verifyPassword(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, encryptedPassword);
  }
}
