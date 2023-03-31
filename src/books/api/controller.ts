import { Request, Response } from 'express';
import { AddBook } from '../application/AddBook';
import { InMemoryBookRepository } from '../infra/InMemoryBookRepository';
import { BookFactory } from '../domain/BookFactory';
import { UuidGenerator } from '../../shared/utils/UuidGenerator';
import { BookMapper } from '../application/mappers/BookMapper';

export class BooksController {
  async addNewBook(req: Request, res: Response) {
    const { title } = req.body;

    const uuidGenerator = new UuidGenerator();
    const bookFactory = new BookFactory(uuidGenerator);
    const bookRepository = new InMemoryBookRepository();
    const bookMapper = new BookMapper();
    const addBook = new AddBook(bookFactory, bookRepository, bookMapper);

    try {
      const book = await addBook.execute(title);

      res.status(201).json(book);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
