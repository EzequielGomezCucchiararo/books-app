import { UuidGenerator } from '../../shared/utils/UuidGenerator';
import { Book } from './Book';

interface CreateBookParams {
  id?: string;
  title: string;
}

export class BookFactory {
  private _uuidGenerator: UuidGenerator;

  constructor(uuidGenerator: UuidGenerator) {
    this._uuidGenerator = uuidGenerator;
  }

  public createBook(params: CreateBookParams) {
    const id = params.id ?? this._uuidGenerator.generateUuid();

    return new Book({ id, title: params.title });
  }
}
