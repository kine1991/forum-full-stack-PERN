import { Request, Response } from 'express';
import slugify from 'slugify';
import catchAsync from "../utils/catchAsync";
import { BadRequestError } from '../utils/errors';
import client from '../utils/client';
import validator from 'validator';

export const getChannels = catchAsync(async (req: Request, res: Response) => {
  const amount_channels_res = await client.query('SELECT COUNT(id) FROM channels');
  const ammount_channels = +amount_channels_res.rows[0].count;
  
  // query params
  const limit = req.query.limit ? +req.query.limit : 20;
  const all_pages = +ammount_channels !== 0 ? Math.ceil(ammount_channels/limit) : 1;
  const page: any = req.query.page ? +req.query.page : 1;
  const order_by: any = req.query.order_by ? req.query.order_by : '';

  const pageIsNumber = /^\d+$/.test(<any>page);
  if(!pageIsNumber) throw new BadRequestError(`This page (${page}) is incorrect`, 404);
  
  const offset = limit * (page - 1);

  if(all_pages < page) throw new BadRequestError(`This page (${page}) do not exists`, 404);

  let channels;

  if(order_by) {
    console.log('@@@', order_by)
    const is_correct = order_by.toLowerCase() === 'asc' || order_by.toLowerCase() === 'desc'
    if(!is_correct) throw new BadRequestError(`query params order_by: ${order_by} is incorrect`, 404);
    channels = await client.query({
      text: `SELECT * FROM channels ORDER BY created_at ${order_by} LIMIT $1 OFFSET $2`,
      values: [limit, offset]
    });
  } else {
      channels = await client.query({
        text: 'SELECT * FROM channels LIMIT $1 OFFSET $2',
        values: [limit, offset]
      });
  }

  res.status(200).json({
    all_channels: ammount_channels,
    channels_on_page: channels.rows.length,
    channels: channels.rows
  });
});

export const getOwnChannels = catchAsync(async (req: Request, res: Response) => {
  const current_user_id = req.user?.id;
  const channels = await client.query({
    text: `
      SELECT 
        id,
        slug,
        name,
        active,
        image_url_channel,
        created_at
      FROM channels 
      WHERE channels.user_id = $1 AND active = true
    `,
    values: [current_user_id]
  });

  res.status(200).json({
    channels: channels.rows
  });
});


export const channelSearch = catchAsync(async (req: Request, res: Response) => {
  const { term } = req.body;
  // const channels;
  res.status(200).json({
    channels: 'channels.rows'
  });
});

export const getChannelBySlug = catchAsync(async (req: Request, res: Response) => {
  const channel = await client.query({
    text: 'SELECT * FROM channels WHERE slug = $1',
    values: [req.params.channel_slug]
  });

  if(channel.rows.length === 0)  throw new BadRequestError(`Page with this slug: ${req.params.channel_slug} not found`, 404);

  res.status(200).json({
    channel: channel.rows[0]
  })
});

export const getChannelById = catchAsync(async (req: Request, res: Response) => {
  const channel = await client.query({
    text: 'SELECT * FROM channels WHERE id = $1',
    values: [req.params.channel_id]
  });

  if(channel.rows.length === 0)  throw new BadRequestError(`Channel with this id: ${req.params.channel_id} not found`, 404);

  res.status(200).json({
    channel: channel.rows[0]
  });
});

export const updateChannel = catchAsync(async (req: Request, res: Response) => {
  const current_user_id = req.user?.id;

  const channel_res = await client.query({
    text: 'SELECT * FROM channels WHERE id = $1',
    values: [req.params.channel_id]
  });

  if(channel_res.rows.length === 0)  throw new BadRequestError(`Channel with this id: ${req.params.channel_id} not found`, 404);

  const user_id = channel_res.rows[0].user_id;
  if(current_user_id !== user_id) throw new BadRequestError('Permission denied', 403);

  const { name, description, image_url_channel } = req.body;

  const updated_channel_res = await client.query({
    text: 'UPDATE channels SET name = $1, description = $2, image_url_channel = $3 WHERE id = $4 returning *',
    values: [name, description, image_url_channel, req.params.channel_id]
  });

  res.status(200).json({
    // channel: channel
    channel: updated_channel_res.rows[0]
  });
});


export const trashChannel = catchAsync(async (req: Request, res: Response) => {
  await client.query({
    text: `UPDATE channels SET active = false WHERE id = $1 returning *`,
    values: [req.params.channel_id]
  });

  res.status(204).json({});
});

export const deleteChannel = catchAsync(async (req: Request, res: Response) => {
  await client.query({
    text: 'DELETE FROM channels WHERE channels.id = $1',
    values: [req.params.channel_id]
  });

  res.status(204).json({});
});

export const createChannel = catchAsync(async (req: Request, res: Response) => {
  const { name, description, image_url_channel = 'https://i.imgur.com/AdWqAoq.jpg' } = req.body;

  
  const slug = slugify(name, { replacement: '-', remove: undefined, lower: true, strict: true, locale: 'ru' });
  
  const user_id = req.user?.id;
  const newChannel = await client.query({
    text: 'INSERT INTO channels (name, description, slug, image_url_channel, user_id) VALUES ($1, $2, $3, $4, $5) returning *',
    values: [name, description, `${slug}-${Date.now()}`, image_url_channel, user_id]
  });

  res.status(201).json({
    channel: newChannel.rows[0]
  })
});

export const getTopicsByChannelSlug = catchAsync(async (req: Request, res: Response) => {
  const channelIdRef = await client.query({
    text: 'SELECT * FROM channels WHERE channels.slug = $1',
    values: [req.params.channel_slug]
  })
  const channel = channelIdRef.rows[0];
  if(!channel) throw new BadRequestError('This channel does not exists', 404);
  const channel_id = channel.id;

  // const getTopicsByChannelId = await client.query({
  //   text: 'SELECT * FROM topics WHERE topics.channel_id = $1',
  //   values: [channel_id]
  // });

  const getTopicsByChannelId = await client.query({
    text: `
      SELECT 
        topics.id AS topic_id,
        topics.name AS topic_name,
        topics.slug AS topic_slug,
        topics.created_at AS topic_created_at,
        MAX(comments.created_at) AS last_comment_created_at,
        COUNT(comments.id) AS total_comments,
        MIN(users.id) AS user_id,
        MIN(users.nickname) AS user_nickname,
        MIN(users.email) AS user_email,
        MIN(users.image_url) AS user_image_url
      FROM topics 
      LEFT JOIN comments ON topics.id = comments.topic_id 
      LEFT JOIN users ON comments.user_id = users.id
      WHERE topics.channel_id = $1
      GROUP BY topics.id;    
    `,
    values: [channel_id]
  });

  const topics = getTopicsByChannelId.rows;

  res.json({
    topics
  });
});

export const createTopicIntoChannel = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;

  if(validator.isEmpty(name)) throw new BadRequestError('Please provide name!', 400);

  const channelIdRef = await client.query({
    text: 'SELECT * FROM channels WHERE channels.slug = $1',
    values: [req.params.channel_slug]
  });

  const channel = channelIdRef.rows[0];
  if(!channel) throw new BadRequestError('This channel does not exists', 404);
  const channel_id = channel.id;
  const user_id = req.user?.id;
  const slug = slugify(name, { replacement: '-', remove: undefined, lower: true, strict: true, locale: 'ru' });
  const newTopic = await client.query({
    text: 'INSERT INTO topics (name, slug, user_id, channel_id) VALUES ($1, $2, $3, $4) returning *',
    values: [name, `${channel_id}-${slug}`, user_id, +channel_id]
  });

  res.json({
    topic: newTopic.rows[0]
  });
});

export const getTopicBySlug = catchAsync(async (req: Request, res: Response) => {
  const topic = await client.query({
    text: `SELECT 
      channels.name as channel_name, 
      topics.name AS topic_name, 
      topics.slug AS topic_slug, 
      channels.slug AS channel_slug, 
      topics.created_at AS topic_created_at, 
      channels.created_at AS channel_created_at, 
      nickname, 
      email, 
      image_url AS user_image_url  
      FROM topics 
      JOIN channels ON topics.channel_id = channels.id 
      JOIN users ON topics.user_id = users.id 
      WHERE topics.slug = $1`,
    values: [req.params.topic_slug]
  });

  res.json({
    topic: topic.rows[0]
  });
});

export const dropTableChannels = catchAsync(async (req: Request, res: Response) => {
  await client.query('DROP TABLE channels');

  res.status(204).json({});
});

export const dropTableTopics = catchAsync(async (req: Request, res: Response) => {
  await client.query('DROP TABLE topics');

  res.status(204).json({});
});