import { BookRepository } from '../domain/BookRepository';
import { Book } from '../domain/Book';
import { BookFactory } from '../domain/BookFactory';
import { BookMapper } from './mappers/BookMapper';

export type UpdateBookPayload = Partial<Book>;

export class UpdateBook {
  private _bookFactory: BookFactory;
  private _bookRepository: BookRepository;
  private _bookMapper: BookMapper;

  constructor(
    bookFactory: BookFactory,
    bookRepository: BookRepository,
    bookMapper: BookMapper
  ) {
    this._bookFactory = bookFactory;
    this._bookRepository = bookRepository;
    this._bookMapper = bookMapper;
  }

  async execute(bookId: string, updates: UpdateBookPayload) {
    const book = await this._bookRepository.findById(bookId);

    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }

    const bookData = this._bookMapper.mapBookToBookData(book);
    const updatedBookData = { ...bookData, ...updates };
    const updatedBook = this._bookFactory.createBook(updatedBookData);

    await this._bookRepository.save(updatedBook);

    return this._bookMapper.mapBookToBookData(updatedBook);
  }
}
