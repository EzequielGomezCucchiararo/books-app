import { Request, Response } from 'express';
import { AddBook } from '../../application/AddBook';

export class AddNewBookController {
  private readonly _addBook: AddBook;

  constructor(addBook: AddBook) {
    this._addBook = addBook;
  }
  async execute(req: Request, res: Response) {
    const { title } = req.body;

    try {
      const book = await this._addBook.execute({ title });

      res.status(201).json(book);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
