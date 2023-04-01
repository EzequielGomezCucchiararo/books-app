import { BookRepository } from '../domain';
import { BookData, BookMapper } from './mappers/BookMapper';

export class GetAllBooks {
  private readonly bookMapper: BookMapper;
  private readonly bookRepository: BookRepository;

  constructor(bookMapper: BookMapper, bookRepository: BookRepository) {
    this.bookMapper = bookMapper;
    this.bookRepository = bookRepository;
  }

  async execute(): Promise<BookData[]> {
    const books = await this.bookRepository.getAllBooks();
    return this.bookMapper.mapBooksToBooksData(books);
  }
}
