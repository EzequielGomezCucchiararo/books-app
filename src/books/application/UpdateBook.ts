import { Book, BookFactory, BookRepository } from '../domain';
import { BookMapper } from './mappers/BookMapper';
import { BookNotFoundError } from '../domain/errors';

export type UpdateBookPayload = Partial<Book>;

export class UpdateBook {
  private _bookFactory: BookFactory;
  private _bookRepository: BookRepository;
  private _bookMapper: BookMapper;

  constructor(
    bookFactory: BookFactory,
    bookRepository: BookRepository,
    bookMapper: BookMapper,
  ) {
    this._bookFactory = bookFactory;
    this._bookRepository = bookRepository;
    this._bookMapper = bookMapper;
  }

  async execute(bookId: string, updates: UpdateBookPayload) {
    const book = await this._bookRepository.findById(bookId);

    if (!book) {
      throw BookNotFoundError.create(bookId);
    }

    const bookData = this._bookMapper.mapBookToBookData(book);
    const updatedBookData = { ...bookData, ...updates };
    const updatedBook = this._bookFactory.createBook(updatedBookData);

    await this._bookRepository.save(updatedBook);

    return this._bookMapper.mapBookToBookData(updatedBook);
  }
}
