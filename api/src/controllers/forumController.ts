import { Request, Response } from 'express';
import slugify from 'slugify';
import catchAsync from "../utils/catchAsync";
import { BadRequestError } from '../utils/errors';
import client from '../utils/client';


//   await client.query('CREATE TABLE IF NOT EXISTS channels (id serial PRIMARY KEY, name varchar(255) NOT NULL, description varchar(2000), image_url_channel varchar(255), created_at TIMESTAMP DEFAULT NOW(), user_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id))');

export const getChannels = catchAsync(async (req: Request, res: Response) => {
  const channels = await client.query('SELECT * FROM channels');

  res.status(200).json({
    length: channels.rows.length,
    channels: channels.rows
  })
});

export const createChannel = catchAsync(async (req: Request, res: Response) => {
  const { name, description, image_url_channel = 'https://i.imgur.com/AdWqAoq.jpg' } = req.body;

  const slug = slugify(name, { replacement: '-', remove: undefined, lower: true, strict: true, locale: 'ru' });

  const user_id = req.user?.id;
  console.log(name, description, image_url_channel, user_id);
  const newChannel = await client.query({
    text: 'INSERT INTO channels (name, description, slug, image_url_channel, user_id) VALUES ($1, $2, $3, $4, $5) returning *',
    values: [name, description, `${slug}-${Date.now()}`, image_url_channel, user_id]
  })

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

  const getTopicsByChannelId = await client.query({
    text: 'SELECT * FROM topics WHERE topics.channel_id = $1',
    values: [channel_id]
  });

  res.json({
    topic: getTopicsByChannelId.rows
  });
});
// await client.query('CREATE TABLE IF NOT EXISTS topics (id serial PRIMARY KEY, name varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW(), user_id INTEGER NOT NULL, channel_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(channel_id) REFERENCES channels(id)');
export const createTopicIntoChannel = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;

  const channelIdRef = await client.query({
    text: 'SELECT * FROM channels WHERE channels.slug = $1',
    values: [req.params.channel_slug]
  })
  const channel = channelIdRef.rows[0];
  if(!channel) throw new BadRequestError('This channel does not exists', 404);
  const channel_id = channel.id;
  const user_id = req.user?.id;
  const slug = slugify(name, { replacement: '-', remove: undefined, lower: true, strict: true, locale: 'ru' });

  const newTopic = await client.query({
    text: 'INSERT INTO topics (name, slug, user_id, channel_id) VALUES ($1, $2, $3, $4) returning *',
    values: [name, `${channel_id}-${slug}`, user_id, +channel_id]
  });

  // console.log('slug', slug);
  // console.log('req.params.channel_slug@', req.params.channel_slug);
  res.json({
    topic: newTopic.rows[0]
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