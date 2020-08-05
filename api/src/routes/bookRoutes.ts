import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.route('/')
  .get(bookController.getBooks)
  .post(bookController.createBooks);

router.route('/:id')
  .get(bookController.getBookById)
  .patch(bookController.updateBookById)
  .delete(bookController.deleteBookById);

export default router;