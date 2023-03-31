import express from 'express';
import { bootstrap } from './bootstrap';
import {
  addNewBookValidator,
  deleteBookValidator,
  updateBookValidator,
} from './schema-validators';

const {
  addNewBookHandler,
  deleteBookHandler,
  getAllBooksHandler,
  updateBookHandler,
} = bootstrap();

const router = express.Router();

router.get('/', getAllBooksHandler);
router.post('/', addNewBookValidator, addNewBookHandler);
router.put('/:id', updateBookValidator, updateBookHandler);
router.delete('/:id', deleteBookValidator, deleteBookHandler);

export { router as booksRouter };
