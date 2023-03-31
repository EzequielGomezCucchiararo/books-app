import { Book } from '../domain/Book';
import { BookRepository } from '../domain/BookRepository';

export class InMemoryBookRepository implements BookRepository {
  private readonly _books: Book[] = [];

  async findByTitle(title: string): Promise<Book[]> {
    return this._books.filter((book) => book.title === title);
  }

  async findById(id: string): Promise<Book | null> {
    return this._books.find((book) => book.id === id) || null;
  }

  async save(book: Book): Promise<void> {
    const existingBook = this._books.find((b) => b.id === book.id);

    if (!existingBook) {
      this._books.push(book);
    }
  }

  async delete(book: Book): Promise<void> {
    const index = this._books.findIndex((b) => b.id === book.id);

    if (index !== -1) {
      this._books.splice(index, 1);
    }
  }

  getAllBooks(): Book[] {
    return this._books;
  }
}
