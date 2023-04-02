import { Book, BookRepository } from '../domain';

export class InMemoryBookRepository implements BookRepository {
  private _books: Map<string, Book> = new Map();

  async findByTitle(title: string): Promise<Book[]> {
    const foundBooks: Book[] = [];

    for (const book of this._books.values()) {
      if (book.title === title) {
        foundBooks.push(book);
      }
    }

    return foundBooks;
  }

  async findById(id: string): Promise<Book | null> {
    return this._books.get(id) || null;
  }

  async save(book: Book): Promise<void> {
    this._books.set(book.id, book);
  }

  async delete(book: Book): Promise<string> {
    this._books.delete(book.id);

    return book.id;
  }

  async getAllBooks(): Promise<Book[]> {
    return [...this._books.values()];
  }
}
