import { Request, Response } from 'express';
import { GetAllBooks } from '../../application';

export class GetAllBooksController {
  private readonly _getAllBooks: GetAllBooks;

  constructor(getAllBooks: GetAllBooks) {
    this._getAllBooks = getAllBooks;
  }
  async execute(req: Request, res: Response) {
    try {
      const books = await this._getAllBooks.execute();

      res.status(201).json(books);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
