import express from 'express';
import { bootstrap } from './bootstrap';

const {
  addNewBookHandler,
  deleteBookHandler,
  getAllBooksHandler,
  updateBookHandler,
} = bootstrap();
const router = express.Router();

router.get('/', getAllBooksHandler);
router.post('/', addNewBookHandler);
router.put('/:id', updateBookHandler);
router.delete('/:id', deleteBookHandler);

export { router as booksRouter };
