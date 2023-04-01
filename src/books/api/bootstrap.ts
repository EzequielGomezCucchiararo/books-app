import { BookFactory } from '../domain';
import { InMemoryBookRepository } from '../infra';
import { UuidGenerator } from '../../shared';
import {
  AddBook,
  BookMapper,
  DeleteBook,
  GetAllBooks,
  UpdateBook,
} from '../application';
import {
  AddNewBookController,
  DeleteBookController,
  GetAllBooksController,
  UpdateBookController,
} from './controllers';

export function bootstrap() {
  const uuidGenerator = new UuidGenerator();
  const bookFactory = new BookFactory(uuidGenerator);
  const bookRepository = new InMemoryBookRepository();
  const bookMapper = new BookMapper();

  const addBook = new AddBook(bookFactory, bookRepository, bookMapper);
  const deleteBook = new DeleteBook(bookRepository);
  const getAllBooks = new GetAllBooks(bookMapper, bookRepository);
  const updateBook = new UpdateBook(bookFactory, bookRepository, bookMapper);

  const addNewBookController = new AddNewBookController(addBook);
  const deleteBookController = new DeleteBookController(deleteBook);
  const getAllBooksController = new GetAllBooksController(getAllBooks);
  const updateBookController = new UpdateBookController(updateBook);

  return {
    addNewBookHandler: addNewBookController.execute.bind(addNewBookController),
    deleteBookHandler: deleteBookController.execute.bind(deleteBookController),
    getAllBooksHandler: getAllBooksController.execute.bind(
      getAllBooksController,
    ),
    updateBookHandler: updateBookController.execute.bind(updateBookController),
  };
}
