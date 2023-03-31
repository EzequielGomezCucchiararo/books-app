import { BookFactory } from '../domain/BookFactory';
import { InMemoryBookRepository } from '../infra/InMemoryBookRepository';
import { BookMapper } from '../application/mappers/BookMapper';
import { UuidGenerator } from '../../shared/utils/UuidGenerator';
import { AddBook } from '../application/AddBook';
import { GetAllBooks } from '../application/GetAllBooks';
import { UpdateBook } from '../application/UpdateBook';
import { AddNewBookController, GetAllBooksController, UpdateBookController } from './controllers';

export function bootstrap() {
  const uuidGenerator = new UuidGenerator();
  const bookFactory = new BookFactory(uuidGenerator);
  const bookRepository = new InMemoryBookRepository();
  const bookMapper = new BookMapper();

  const addBook = new AddBook(bookFactory, bookRepository, bookMapper);
  const getAllBooks = new GetAllBooks(bookRepository);
  const updateBook = new UpdateBook(bookFactory, bookRepository, bookMapper);

  const addNewBookController = new AddNewBookController(addBook);
  const getAllBooksController = new GetAllBooksController(getAllBooks);
  const updateBookController = new UpdateBookController(updateBook);

  return {
    addNewBookHandler: addNewBookController.execute.bind(addNewBookController),
    getAllBooksHandler: getAllBooksController.execute.bind(getAllBooksController),
    updateBookHandler: updateBookController.execute.bind(updateBookController)
  }
}
