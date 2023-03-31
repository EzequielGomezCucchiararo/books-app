import { BookRepository } from '../domain/BookRepository';

export class DeleteBook {
  private _bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this._bookRepository = bookRepository;
  }

  async execute(bookId: string) {
    const book = await this._bookRepository.findById(bookId);

    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }

    return this._bookRepository.delete(book);
  }
}
