import express from 'express';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './controllers/errorController';
import bookRouter from './routes/bookRoutes';
import client from './utils/client';

const app = express();

const createTabe = async () => {
  await client.query('CREATE TABLE IF NOT EXISTS books (book_id serial PRIMARY KEY, title text NOT NULL, isbn text NOT NULL)');
}

createTabe();

// bodyParser
app.use(express.json({ limit: '10kb' })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// cookie
app.use(cookieParser());

// ROUTES
app.use('/api/books', bookRouter);

// ERROR HANDLER
app.use(globalErrorHandler);


export default app;
