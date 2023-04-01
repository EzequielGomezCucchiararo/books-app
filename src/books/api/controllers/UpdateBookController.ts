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
    const bookId = req.params.id;
    const bookUpdates: UpdateBookPayload = req.body;

    try {
      const updatedBook = await this._updateBook.execute(bookId, bookUpdates);

      return res.status(201).json(updatedBook);
    } catch (error: any) {
      if (error instanceof BookNotFoundError) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
