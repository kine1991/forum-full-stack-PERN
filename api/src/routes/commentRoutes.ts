import express from 'express';
import * as authController from '../controllers/authController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.route('/by_topic/:slug')
  .get(commentController.getCommentsByTopic)
  .post(authController.protect, commentController.createComment);

export default router;
