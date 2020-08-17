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

  const comments = await client.query({
    text: 'SELECT * FROM comments WHERE comments.topic_id = $1',
    values: [topic_id]
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
  })
  res.status(201).json({
    comment: comment.rows[0]
  })
});