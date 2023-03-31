import { v4 as uuidv4 } from 'uuid';

export class UuidGenerator {
  generateUuid() {
    return uuidv4();
  }
}
