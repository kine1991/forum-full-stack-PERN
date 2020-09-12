import express from 'express';
import * as authController from '../controllers/authController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.route('/').get(commentController.getAllComments)

router.route('/by_topic/:slug')
  .get(commentController.getCommentsByTopic)
  .post(authController.protect, commentController.createComment);

router.route('/last-comments').get(commentController.getLastComments);

router.route('/:comment_id')
  .delete(authController.protect, commentController.deleteComment);

export default router;
