import { Request, Response } from 'express';
import { DeleteBook } from '../../application/DeleteBook';

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
      // TODO: Manage errors based on error type
      res.status(500).send('Internal Server Error');
    }
  }
}
