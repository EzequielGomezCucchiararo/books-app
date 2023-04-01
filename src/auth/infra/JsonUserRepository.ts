import * as fs from 'fs';
import * as path from 'path';
import { User, UserFactory } from '../domain';
import { UserMapper } from './mappers';
import { UserData } from './mappers/UserMapper';
import { PasswordEncryptor } from './PasswordEncryptor';

const JSON_DATA_BASE_FILE_PATH = path.join(__dirname, 'users-db.json');

export class JsonUserRepository {
  private userFactory: UserFactory;
  private userMapper: UserMapper;
  private passwordEncryptor: PasswordEncryptor;

  constructor(
    userFactory: UserFactory,
    userMapper: UserMapper,
    passwordEncryptor: PasswordEncryptor,
  ) {
    this.userFactory = userFactory;
    this.userMapper = userMapper;
    this.passwordEncryptor = passwordEncryptor;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.getData();
    const userData = data.users.find((u: UserData) => u.email === email);

    return userData ? this.userFactory.createUser(userData) : null;
  }

  async save(user: User): Promise<void> {
    const data = await this.getData();
    const userData = this.userMapper.mapUserToUserData(user);
    userData.password = await this.passwordEncryptor.hashPassword(
      userData.password,
    );

    const existingIndex = data.users.findIndex(
      (u: UserData) => u.id === userData.id,
    );

    if (existingIndex >= 0) {
      data.users[existingIndex] = userData;
    } else {
      data.users.push(userData);
    }

    await this.saveData(data);
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return await this.passwordEncryptor.verifyPassword(password, user.password);
  }

  private async getData(): Promise<{ users: UserData[] }> {
    return new Promise((resolve, reject) => {
      fs.readFile(JSON_DATA_BASE_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve({ users: [] });
          } else {
            reject(err);
          }
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  private async saveData(data: { users: UserData[] }): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        JSON_DATA_BASE_FILE_PATH,
        JSON.stringify(data),
        'utf8',
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }
}
