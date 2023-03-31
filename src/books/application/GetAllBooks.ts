import { Book } from '../domain/book';
import { BookRepository } from '../domain/BookRepository';

export class GetAllBooks {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAllBooks();
  }
}
