import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';

import { booksRouter } from './books/api/router';
import { authRouter } from './auth/api/router';
import { authGuard } from './shared';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', authGuard, booksRouter);

app.use(express.static(path.join(__dirname, '..', 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
