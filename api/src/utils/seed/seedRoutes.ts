import express from 'express';
import * as seedControllers from './seedControllers';

const router = express.Router();

// router.get('/create-users', (req, res) => {
//   res.status(200).json({
//     aaa: '222'
//   })
// });

router.route('/create-users').get(seedControllers.seedUsers)
router.route('/create-channels').get(seedControllers.seedChannels)
router.route('/create-topics').get(seedControllers.seedTopics)

// router.route('/create-users')
//   .get(seedControllers.seedUsers)
  
export default router;