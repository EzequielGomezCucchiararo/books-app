import { UuidGenerator } from '../../shared/UuidGenerator';
import { Book } from './Book';

export class BookFactory {
  private _uuidGenerator: UuidGenerator;

  constructor(uuidGenerator: UuidGenerator) {
    this._uuidGenerator = uuidGenerator;
  }

  public createBook(title: string) {
    const id = this._uuidGenerator.generateUuid();

    return new Book({ id, title });
  }
}
