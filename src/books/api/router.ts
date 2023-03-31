import express from 'express';
import { BooksController } from './controller';

const router = express.Router();
const booksController = new BooksController();

router.post('/', booksController.addNewBook);

export { router as booksRouter };
