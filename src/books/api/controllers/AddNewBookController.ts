import { Request, Response } from 'express';
import { AddBook } from '../../application';
import { DuplicatedBookError } from '../../domain/errors';

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
    } catch (error: any) {
      if (error instanceof DuplicatedBookError) {
        res.status(409).json({ error: error.message });
      }

      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
