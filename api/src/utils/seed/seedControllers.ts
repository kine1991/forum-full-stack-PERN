import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

import catchAsync from "../catchAsync";
import { BadRequestError } from '../../utils/errors';
import client from '../../utils/client';

export const seedUsers = catchAsync(async (req: Request, res: Response) => {
  const users = JSON.parse(fs.readFileSync(path.join(path.join(__dirname, '/data/users.json')), 'utf-8'));

  users.map(async (user: any) => {
    const { nickname, email, image_url = 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg', password } = user;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await client.query({
      text: 'INSERT INTO users (nickname, email, password, image_url) VALUES ($1, $2, $3, $4) returning *',
      values: [nickname, email, hashedPassword, image_url]
    });
  });

  res.status(201).json({
    created: 'users created'
  });
});

export const seedChannels = catchAsync(async (req: Request, res: Response) => {
  const channels = JSON.parse(fs.readFileSync(path.join(path.join(__dirname, '/data/channels.json')), 'utf-8'));

  const users_res = await client.query({
    text: 'SELECT * FROM users ORDER BY id LIMIT 5'
  });

  const users = users_res.rows;

  // console.log('randomUser', randomUserId);
  
  channels.map(async (channel: any) => {
    const { name, description, image_url_channel = 'https://i.imgur.com/AdWqAoq.jpg' } = channel;
    const randomUserId = users[Math.floor(Math.random() * users.length)].id;

    const slug = slugify(name, { replacement: '-', remove: undefined, lower: true, strict: true, locale: 'ru' });
    console.log(channel)

    const newChannel = await client.query({
      text: 'INSERT INTO channels (name, description, slug, image_url_channel, user_id) VALUES ($1, $2, $3, $4, $5) returning *',
      values: [name, description, `${slug}-${Date.now()}`, image_url_channel, randomUserId]
    });
  });
  // {
  //   "name": "",
  //   "description": "",
  //   "image_url_channel": ""
  // }
  res.status(201).json({
    created: 'channels created'
  });
});

const getShuffledArray = (arr: any) => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
};

export const seedTopics = catchAsync(async (req: Request, res: Response) => {
  const topics = JSON.parse(fs.readFileSync(path.join(path.join(__dirname, '/data/topics.json')), 'utf-8'));

  const channels_res = await client.query({
    text: 'SELECT id FROM channels'
  });

  const users_res = await client.query({
    text: 'SELECT id FROM users'
  });

  const users = users_res.rows;
  const channels = channels_res.rows;

  channels.map(async (channel: any) => {
    const channel_id = channel.id;
    const shuffledTopics = getShuffledArray(topics);
    const randomLimitTopics = Math.floor(Math.random()*shuffledTopics.length)
    const shuffledTopicsLimited = shuffledTopics.slice(0, randomLimitTopics);

    // user id random
    const limitedUsers = 5;
    const shuffledUsersLimited = getShuffledArray(users).slice(0, limitedUsers);
    await shuffledTopicsLimited.map(async (topic: any) => {
      console.log('--------')
      const randomUsersLimitedIndex = Math.floor(Math.random()*shuffledUsersLimited.length)
      const user_id = shuffledUsersLimited[randomUsersLimitedIndex].id;
      console.log(topic)
      const name = topic.name;
      const slug = slugify(name, { replacement: '-', remove: undefined, lower: true, strict: true, locale: 'ru' });
      const newTopic = await client.query({
        text: 'INSERT INTO topics (name, slug, user_id, channel_id) VALUES ($1, $2, $3, $4) returning *',
        values: [name, `${channel_id}-${slug}`, user_id, +channel_id]
      });
    });
  });


  res.send({
    topics: "created"
  });
});

export const seedComments = catchAsync(async (req: Request, res: Response) => {
  const comments = JSON.parse(fs.readFileSync(path.join(path.join(__dirname, '/data/comments.json')), 'utf-8'));

  const users_res = await client.query({
    text: 'SELECT * FROM users'
  });
  
  const topics_res = await client.query({
    text: 'SELECT * FROM topics'
  });
  
  const users = users_res.rows;
  const topics = topics_res.rows;

  comments.map(async (comment: any) => {
    console.log('--------------------');
    const content = comment.content;
    console.log(content);
    const random_user_index = Math.floor(Math.random() * users.length);
    const random_topic_index = Math.floor(Math.random() * topics.length);
    const user_id = users[random_user_index].id;
    const topic_id = topics[random_topic_index].id;

    await client.query({
      text: 'INSERT INTO comments (content, user_id, topic_id) VALUES ($1, $2, $3)',
      values: [content, user_id, topic_id]
    });

  });


  res.send({
    topics: "created",
    // length: users.length,
    // users: users,
    // length: topics.length,
    // topics: topics,
  });
});

