import express from 'express';
import * as seedControllers from './seedControllers';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/aaa', (req, res) => {
  res.status(200).json({
    aaa: '222'
  })
});

router.route('/create-users').get(seedControllers.seedUsers)
router.route('/create-channels').get(seedControllers.seedChannels)
router.route('/create-topics').get(seedControllers.seedTopics)
router.route('/create-comments').get(seedControllers.seedComments)

router.get('/transform-data', (req, res) => {
  const oldComments = JSON.parse(fs.readFileSync(path.join(path.join(__dirname, '/data/oldComments.json')), 'utf-8'))

  console.log('oldComments', oldComments);

  const comments = oldComments.map((item: any) => {
    return {
      content: item.reviewText,
    }
  })

  fs.writeFile (path.join(__dirname, '/data/comments.json'), JSON.stringify(comments), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );

  res.status(200).json({
    transform: 'true'
  })
});

router.get('/transform-data2', (req, res) => {
  const oldCommentsWithoutReplace = fs.readFileSync(path.join(path.join(__dirname, '/data/oldCommentsWithoutReplace.json')), 'utf-8')

  fs.writeFile (path.join(__dirname, '/data/oldComments.json'), oldCommentsWithoutReplace.replace(/}/gi, '},'), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );

  res.status(200).json({
    transform: 'true'
  })
});

// router.route('/create-users')
//   .get(seedControllers.seedUsers)
  
export default router;