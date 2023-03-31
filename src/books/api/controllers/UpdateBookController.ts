import { Request, Response } from 'express';
import { UpdateBookPayload, UpdateBook } from '../../application/UpdateBook';

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
      // TODO: Manage errors based on error type
      res.status(500).send('Internal Server Error');
    }
  }
}
