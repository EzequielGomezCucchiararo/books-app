import { BookRepository } from '../domain/BookRepository';
import { BookNotFoundError } from '../domain/errors';

export class DeleteBook {
  private _bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this._bookRepository = bookRepository;
  }

  async execute(bookId: string) {
    const book = await this._bookRepository.findById(bookId);

    if (!book) {
      throw BookNotFoundError.create(bookId);
    }

    return this._bookRepository.delete(book);
  }
}
