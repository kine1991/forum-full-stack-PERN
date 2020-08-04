const express = require('express');
const client = require('./client');

const app = express();

app.get('/', async (req, res) => {
  console.log('root');
  console.log('!!!!!**22**!!!')

  const now2 = await client.query('SELECT NOW() as now');

  console.log('now2', now2);
  // client.query('SELECT NOW() as now', (err, res) => {
  //   if (err) {
  //     console.log(err.stack)
  //   } else {
  //     console.log(res.rows[0])
  //   }


  res.json({
    aa: 'aa'
  })
});

app.get('/api', (req, res) => {
  console.log('api');

  res.json({
    aa: 'aa'
  })
  
});

console.log('!!!!!****!!!')
module.exports = app;
