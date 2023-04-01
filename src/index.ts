import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { booksRouter } from './books/api/router';
import { authRouter } from './auth/api/router';
import { authGuard } from './shared';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', authGuard, booksRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});
