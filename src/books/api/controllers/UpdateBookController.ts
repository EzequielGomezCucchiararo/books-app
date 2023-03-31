import { Request, Response } from 'express';
import { UpdateBook } from '../../application';
import { UpdateBookPayload } from '../../application/UpdateBook';
import { BookNotFoundError } from '../../domain/errors';

export class UpdateBookController {
  private readonly _updateBook: UpdateBook;

  constructor(updateBook: UpdateBook) {
    this._updateBook = updateBook;
  }

  async execute(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      const bookUpdates: UpdateBookPayload = req.body;

      const updatedBook = await this._updateBook.execute(bookId, bookUpdates);

      res.status(201).json(updatedBook);
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        res.status(404).json({ error });
      }

      res.status(500).send('Internal Server Error');
    }
  }
}
