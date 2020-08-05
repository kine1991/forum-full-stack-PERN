import client from './utils/client';
import app from './app';

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
  .then((res: any) => {
    startServer();
  })
  .catch((error: any) => {
    console.log('error222', error);
  });