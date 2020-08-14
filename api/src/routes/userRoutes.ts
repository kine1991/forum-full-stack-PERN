import express from 'express';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';

const router = express.Router();

router.route('/').get(authController.protect, userController.getUsers);

router.route('/sign-in')
  .post(authController.signIn);

router.route('/sign-up')
  .post(authController.signUp);

router.route('/drop-user').delete(userController.dropTableUsers);

router.route('/by-nickname/:nickname').get(userController.getUserByNickname);

router.route('/ooo').get(authController.protect);
// router.route('/check-auth').get(authController.checkAuth);
router.route('/logout').get(authController.logout);

router.route('/:id').get(userController.getUserById);

export default router;