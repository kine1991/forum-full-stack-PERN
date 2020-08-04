const app = require('./app');
const client = require('./client');

const connectDb = () => {
  return client.connect();
}

const startServer = () => {
  console.log('startServer (api)');

  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`App (api) running on port ${port}...`);
  });
}

connectDb()
  .then(res => {
    startServer();
  })
  .catch(error => {
    console.log('error222', error);
  })
  // .on('error', console.log)
  // .on('disconnected', connectDb)
  // .once('open', startServer)