import * as fs from 'fs';
import * as path from 'path';

import { User } from '../domain/User';
import { UserFactory } from '../domain/UserFactory';
import { UserMapper } from './mappers';
import { UserData } from './mappers/UserMapper';

const JSON_DATA_BASE_FILE_PATH = path.join(__dirname, 'users-db.json');

export class JsonUserRepository {
  private userFactory: UserFactory;
  private userMapper: UserMapper;

  constructor(userFactory: UserFactory, userMapper: UserMapper) {
    this.userFactory = userFactory;
    this.userMapper = userMapper;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.getData();
    const userData = data.users.find((u: UserData) => u.email === email);

    return userData ? this.userFactory.createUser(userData) : null;
  }

  async save(user: User): Promise<void> {
    const data = await this.getData();
    const userData = this.userMapper.mapUserToUserData(user);
    const existingIndex = data.users.findIndex(
      (u: UserData) => u.id === userData.id
    );

    if (existingIndex >= 0) {
      data.users[existingIndex] = userData;
    } else {
      data.users.push(userData);
    }

    await this.saveData(data);
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
        }
      );
    });
  }
}
