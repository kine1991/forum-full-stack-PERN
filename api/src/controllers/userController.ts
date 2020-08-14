import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { BadRequestError } from '../utils/errors';
import client from '../utils/client';

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await client.query('SELECT * FROM users');

  res.status(200).json({
    results: users.length,
    users: users.rows
  });
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await client.query({
    text: 'SELECT * FROM users WHERE users.id = $1',
    values: [req.params.id]
  });

  res.status(200).json({
    user: user.rows[0]
  });
});

export const getUserByNickname = catchAsync(async (req: Request, res: Response) => {
  const user = await client.query({
    text: 'SELECT * FROM users WHERE users.nickname = $1',
    values: [req.params.nickname]
  });

  res.status(200).json({
    user: user.rows[0]
  });
});

export const dropTableUsers = catchAsync(async (req: Request, res: Response) => {
  await client.query('DROP TABLE users');

  res.status(204).json({});
});