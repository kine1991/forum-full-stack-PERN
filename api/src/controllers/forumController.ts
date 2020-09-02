import { Request, Response } from 'express';
import slugify from 'slugify';
import catchAsync from "../utils/catchAsync";
import { BadRequestError } from '../utils/errors';
import client from '../utils/client';
import validator from 'validator';

export const getChannels = catchAsync(async (req: Request, res: Response) => {
  const amountChannelsRes = await client.query('SELECT COUNT(id) FROM channels');
  const ammount_channels = +amountChannelsRes.rows[0].count;
  
  const limit = req.query.limit ? +req.query.limit : 20;
  const all_pages = +ammount_channels !== 0 ? Math.ceil(ammount_channels/limit) : 1;
  const page: any = req.query.page ? +req.query.page : 1;

  const pageIsNumber = /^\d+$/.test(<any>page);
  if(!pageIsNumber) throw new BadRequestError(`This page (${page}) is incorrect`, 404);
  
  const offset = limit * (page - 1);

  if(all_pages < page) throw new BadRequestError(`This page (${page}) do not exists`, 404);

  const channels = await client.query({
    text: 'SELECT * FROM channels LIMIT $1 OFFSET $2',
    values: [limit, offset]
  });

  res.status(200).json({
    all_channels: ammount_channels,
    channels_on_page: channels.rows.length,
    channels: channels.rows
  });
});

export const getOwnChannels = catchAsync(async (req: Request, res: Response) => {
  const channels = await client.query({
    text: 'SELECT * FROM channels',
    values: []
  });

  res.status(200).json({
    channels: channels.rows
  });
});

export const getChannel = catchAsync(async (req: Request, res: Response) => {
  const channel = await client.query({
    text: 'SELECT * FROM channels WHERE slug = $1',
    values: [req.params.channel_slug]
  });

  if(channel.rows.length === 0)  throw new BadRequestError(`Page with this slug: ${req.params.channel_slug} not found`, 404);

  res.status(200).json({
    channel: channel.rows[0]
  })
});

export const deleteChannel = catchAsync(async (req: Request, res: Response) => {
  // channel_id
  await client.query({
    text: 'DELETE FROM channels WHERE channels.id = $1',
    values: [req.params.channel_id]
  })

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