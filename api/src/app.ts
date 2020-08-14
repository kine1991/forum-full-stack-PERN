import express from 'express';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './controllers/errorController';
import userRouter from './routes/userRoutes';
import bookRouter from './routes/bookRoutes';
import forumRouter from './routes/forumRoutes';
import client from './utils/client';

const app = express();

const createTabe = async () => {
  await client.query('CREATE TABLE IF NOT EXISTS books (book_id serial PRIMARY KEY, title text NOT NULL, isbn text NOT NULL)');
  await client.query('CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, nickname varchar(255) UNIQUE NOT NULL, email varchar(255) UNIQUE NOT NULL, password varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW())');
  await client.query('CREATE TABLE IF NOT EXISTS channels (id serial PRIMARY KEY, name varchar(255) NOT NULL, slug varchar(300) UNIQUE NOT NULL, description varchar(2000), image_url_channel varchar(255), created_at TIMESTAMP DEFAULT NOW(), user_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id))');
  await client.query('CREATE TABLE IF NOT EXISTS topics (id serial PRIMARY KEY, name varchar(255) NOT NULL, slug varchar(300) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT NOW(), user_id INTEGER NOT NULL, channel_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(channel_id) REFERENCES channels(id))');

}

createTabe();

// bodyParser
app.use(express.json({ limit: '10kb' })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// cookie
app.use(cookieParser());

// ROUTES
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/forums', forumRouter);

// ERROR HANDLER
app.use(globalErrorHandler);


export default app;
