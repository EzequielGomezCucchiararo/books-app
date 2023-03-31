import { Request, Response } from 'express';
import { DeleteBook } from '../../application';
import { BookNotFoundError } from '../../domain/errors';

export class DeleteBookController {
  private readonly _deleteBook: DeleteBook;

  constructor(deleteBook: DeleteBook) {
    this._deleteBook = deleteBook;
  }

  async execute(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      const response = await this._deleteBook.execute(bookId);

      res.status(201).json(response);
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        res.status(404).json({ error });
      }

      res.status(500).send('Internal Server Error');
    }
  }
}
