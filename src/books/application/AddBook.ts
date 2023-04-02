import { BookFactory, BookRepository } from '../domain';
import { BookData, BookMapper } from './mappers/BookMapper';
import { DuplicatedBookError } from '../domain/errors';

interface AddBookPayload {
  title: string;
}

export class AddBook {
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
  async execute({ title }: AddBookPayload): Promise<BookData> {
    const existingBooks = await this._bookRepository.findByTitle(title);

    if (existingBooks.length > 0) {
      throw DuplicatedBookError.create(title);
    }

    const book = this._bookFactory.createBook({ title });

    await this._bookRepository.save(book);

    return this._bookMapper.mapBookToBookData(book);
  }
}
