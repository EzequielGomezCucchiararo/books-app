import { Request, Response } from 'express';
import { DeleteBook } from '../../application';
import { BookNotFoundError } from '../../domain/errors';

export class DeleteBookController {
  private readonly _deleteBook: DeleteBook;

  constructor(deleteBook: DeleteBook) {
    this._deleteBook = deleteBook;
  }

  async execute(req: Request, res: Response) {
    const bookId = req.params.id;

    try {
      const response = await this._deleteBook.execute(bookId);

      res.status(201).json(response);
    } catch (error: any) {
      if (error instanceof BookNotFoundError) {
        res.status(404).json({ error: error.message });
      }

      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
