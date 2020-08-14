import express from 'express';
import * as authController from '../controllers/authController';
import * as forumController from '../controllers/forumController';

const router = express.Router();

router.route('/channels')
  .get(forumController.getChannels)
  .post(authController.protect, forumController.createChannel);

router.route('/topics/:channel_slug')
  .get(forumController.getTopicsByChannelSlug)
  .post(authController.protect, forumController.createTopicIntoChannel)

// router.route('/channels/:channel_id')
//   .get(forumController.getChannel)
router.route('/drop-channels').delete(forumController.dropTableChannels);
router.route('/drop-topics').delete(forumController.dropTableTopics); 

export default router;