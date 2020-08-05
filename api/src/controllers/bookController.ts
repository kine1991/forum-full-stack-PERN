import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { BadRequestError } from '../utils/errors';
import client from '../utils/client';

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await client.query('SELECT * from books');

  res.status(200).json({
    books: books.rows,
    length: books.length
  });
});

export const getBookById = catchAsync(async (req: Request, res: Response) => {
  await checkIfIsExistsHelper(req.params.id, 'book');

  const book = await client.query({
    text: 'SELECT * FROM books WHERE books.book_id = $1',
    values: [req.params.id]
  });

  res.status(200).json({
    book: book.rows
  });
});

export const updateBookById = catchAsync(async (req: Request, res: Response) => {
  await checkIfIsExistsHelper(req.params.id, 'book');

  const { title, isbn } = req.body;
  const modifyTitle = title ? `title = '${title}'` : '';
  const modifyIsbn = isbn ? `isbn = '${isbn}'` : '';

  const ss: any = [modifyTitle, modifyIsbn].filter(array => {
    return array !== '';
  });

  const book = await client.query(`UPDATE books SET ${ss} WHERE book_id = ${req.params.id} returning *`);
  // const book = await client.query({
  //   text: 'UPDATE books SET title = $2, isbn = $3 WHERE book_id = $1 returning *',
  //   values: [req.params.id, undefined, isbn]
  // });

  res.status(200).json({
    book: book.rows
  });
});

export const createBooks = catchAsync(async (req: Request, res: Response) => {
  const { title, isbn } = req.body;

  const book = await client.query({
    text: 'INSERT INTO books (title, isbn) VALUES($1, $2) returning *',
    values: [title, isbn]
  });

  res.status(200).json({
    book: book.rows
  });
});

export const deleteBookById = catchAsync(async (req: Request, res: Response) => {
  await checkIfIsExistsHelper(req.params.id, 'book');

  await client.query({
    text: 'DELETE FROM books WHERE books.book_id = $1',
    values: [req.params.id]
  });

  res.status(204).json({});
});

const checkIfIsExistsHelper = async (value: any, field: any) => {
  const bookIsExists = await client.query({
    text: 'SELECT COUNT(*) FROM books WHERE book_id = $1',
    values: [value]
  });

  if(!+bookIsExists.rows[0].count) throw new BadRequestError(`${field} with id = ${value} do not exists`, 404);
}