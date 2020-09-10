import express from 'express';
import * as authController from '../controllers/authController';
import * as forumController from '../controllers/forumController';

const router = express.Router();

router.route('/channels')
.get(forumController.getChannels)
.post(authController.protect, forumController.createChannel);

router.route('/channels/:channel_slug/by-slug')
  .get(forumController.getChannelBySlug)

router.route('/own-channels')
  .get(authController.protect, forumController.getOwnChannels);

router.route('/channels/:channel_id')
  .get(forumController.getChannelById)
  .put(authController.protect, forumController.updateChannel)
  .patch(authController.protect, forumController.trashChannel)
  .delete(authController.protect, forumController.deleteChannel);

router.route('/topics/by_channel_slug/:channel_slug')
  .get(forumController.getTopicsByChannelSlug)
  .post(authController.protect, forumController.createTopicIntoChannel);

router.route('/topics/:topic_slug').get(forumController.getTopicBySlug);


router.route('/drop-channels').delete(forumController.dropTableChannels);
router.route('/drop-topics').delete(forumController.dropTableTopics); 

export default router;