import express from 'express';
import { bootstrap } from './bootstrap';

const { addNewBookHandler, getAllBooksHandler, updateBookHandler} = bootstrap();
const router = express.Router();

router.get('/', getAllBooksHandler);
router.post('/', addNewBookHandler);
router.put('/:id', updateBookHandler);

export { router as booksRouter };
