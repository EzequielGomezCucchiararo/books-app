import express from 'express';
import bodyParser from 'body-parser';

import { booksRouter } from './books/api/router';

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/books', booksRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
