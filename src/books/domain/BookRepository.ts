import { Book } from './Book';

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  findByTitle(title: string): Promise<Book[]>;
  getAllBooks(): Book[];
  save(book: Book): Promise<void>;
  delete(book: Book): Promise<void>;
}