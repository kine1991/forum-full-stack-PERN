import { Request, Response } from 'express';

import catchAsync from "../utils/catchAsync";
import { BadRequestError } from '../utils/errors';
import client from '../utils/client';

export const getCommentsByTopic = catchAsync(async (req: Request, res: Response) => {
  
  const topicIdRes = await client.query({
    text: 'SELECT id FROM topics WHERE topics.slug = $1 ORDER BY created_at ASC',
    values: [req.params.slug]
  });

  const topic_id = +topicIdRes.rows[0].id;
  const amountCommentsRes = await client.query({
    text: 'SELECT COUNT(id) FROM comments WHERE comments.topic_id = $1',
    values: [topic_id]
  });

  const amount_comments = +amountCommentsRes.rows[0].count;

  const limit = req.query.limit ? +req.query.limit : 20;
  const all_pages = +amount_comments !== 0 ? Math.ceil(amount_comments/limit) : 1;
  const page = req.query.page ? +req.query.page : 1;
  const offset = limit * (page - 1);

  if(all_pages < page) throw new BadRequestError(`This page (${page}) do not exists`, 404);

  const comments = await client.query({
    text: `
      SELECT 
        comments.id AS comment_id, 
        comments.content AS comment_content, 
        comments.created_at AS comment_created_at, 
        users.nickname AS user_nickname, 
        users.email AS user_email, 
        users.image_url AS user_image_url 
      FROM comments INNER JOIN users ON comments.user_id = users.id 
      WHERE comments.topic_id = $1 
      ORDER BY comments.created_at 
      LIMIT $2 OFFSET $3
    `,
    values: [topic_id, limit, offset]
  });

  res.status(200).json({
    comments_on_page: comments.rows.length,
    all_comments :amount_comments,
    comments: comments.rows,
  });
});

export const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const comments = await client.query({
    text: 'SELECT * FROM comments',
    values: []
  });

  res.status(200).json({
    comments: comments.rows
  })
});

export const createComment = catchAsync(async (req: Request, res: Response) => {
  const { content } = req.body;
  const user_id = req.user?.id;

  const topicIdRes = await client.query({
    text: 'SELECT id FROM topics WHERE topics.slug = $1',
    values: [req.params.slug]
  });
  const topic_id = +topicIdRes.rows[0].id;

  const comment = await client.query({
    text: 'INSERT INTO comments (content, topic_id, user_id) VALUES ($1, $2, $3) returning *',
    values: [content, topic_id, user_id]
  });
  res.status(201).json({
    comment: comment.rows[0]
  });
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const current_user_id = req.user?.id;
  const user_role = req.user?.role;
  const user_response = await client.query({
    text: 'SELECT users.id AS user_id FROM comments JOIN users ON comments.user_id = users.id WHERE comments.id = $1',
    values: [req.params.comment_id]
  });
  const user_id = user_response.rows[0].user_id;
  if(!(user_id === current_user_id || (user_role === 'admin' || user_role === 'superadmin'))) throw new BadRequestError('Permission denied', 403);

  await client.query({
    text: 'DELETE FROM comments WHERE comments.id = $1',
    values: [req.params.comment_id]
  });

  res.status(204).json({});
});

export const getLastComments = catchAsync(async (req: Request, res: Response) => {
  const ammount_comments_res = await client.query('SELECT COUNT(id) FROM comments');
  const ammount_comments = ammount_comments_res.rows[0].count;
  const limit = req.query.limit ? +req.query.limit : 20;
  const all_pages = ammount_comments === null ? 0 : Math.ceil(ammount_comments/limit);
  const page: any = req.query.page ? +req.query.page : 1;

  if(all_pages < page) throw new BadRequestError(`comments do not exists`, 404); // !!!!!!Разобраться

  const pageIsNumber = /^\d+$/.test(<any>page);
  if(!pageIsNumber) throw new BadRequestError(`This page (${page}) is incorrect`, 404);
  
  const offset = limit * (page - 1);

  const last_comments_res = await client.query({
    text: `
      SELECT 
        comments.id, 
        comments.content, 
        comments.created_at,
        users.id AS user_id,
        users.nickname AS user_nickname,
        users.email AS user_email,
        users.role AS user_role,
        users.image_url AS user_image_url,
        topics.id AS topic_id,
        topics.slug AS topic_slug,
        topics.name AS topic_name,
        channels.id AS channel_id,
        channels.slug AS channel_slug,
        channels.name AS channel_name
      FROM comments 
      INNER JOIN users ON comments.user_id = users.id
      INNER JOIN topics ON comments.topic_id = topics.id
      INNER JOIN channels ON topics.channel_id = channels.id
      ORDER BY created_at desc LIMIT $1 OFFSET $2;
    `,
    values: [limit, offset]
  });

  const last_comments = last_comments_res.rows;

  res.status(200).json({
    length: last_comments.lenght,
    comments: last_comments,
    ammount_comments
  });
});