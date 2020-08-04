// const { Pool, Client } = require('pg');

// import app from './app';

// const connectDb = () => {
//   // mongoose
//   //   .connect(process.env.MONGO_URL!, {
//   //     useNewUrlParser: true,
//   //     useCreateIndex: true,
//   //     useFindAndModify: false,
//   //     useUnifiedTopology:true
//   //   })
//   //   .then(() => console.log('DB (api service) connection successful!'))
//   //   .catch(() => console.log('DB (api service) connection failed!'));

//   // return mongoose.connection;

//   // const pool = new Pool({
//   //   user: process.env.POSTGRES_USER,
//   //   host: process.env.POSTGRES_HOST,
//   //   database: process.env.POSTGRES_DB,
//   //   password: process.env.POSTGRES_PASSWORD,
//   //   port: process.env.POSTGRES_PORT,
//   // });
//   // pool.query('SELECT NOW()', (err, res) => {
//   //   console.log(err, res)
//   //   pool.end()
//   // });

//   // const client = new Client({
//     // user: process.env.POSTGRES_USER,
//     // host: process.env.POSTGRES_HOST,
//     // database: process.env.POSTGRES_DB,
//     // password: process.env.POSTGRES_PASSWORD,
//     // port: process.env.POSTGRES_PORT,
//   // });
//   const client = new Client({
//     user: process.env.POSTGRES_USER,
//     host: process.env.POSTGRES_HOST,
//     database: process.env.POSTGRES_DB,
//     password: process.env.POSTGRES_PASSWORD,
//     port: process.env.POSTGRES_PORT,
//   });

//   client.connect()
//     .then(() => console.log('DB (api service) connection successful!'))
//     .catch((err: any) => console.log('errrr', err))
//     // .catch(() => console.log('DB (api service) connection failed!'))
//     .finally(() => client.end);

//   return client;
// }

// const startServer = () => {
//   console.log('startServer (api)');

//   const port = process.env.PORT || 3002;

//   app.listen(port, () => {
//     console.log(`App (api) running on port ${port}...`);
//   });
// }

// connectDb()
//   .on('error', console.log)
//   .on('disconnected', connectDb)
//   .once('open', startServer)


console.log('ASSSS!!!!');

// client.connect().then((res: any) => console.log(res))

// // Postgres Client Setup
// const { Pool } = require('pg');
// const pgClient = new Pool({
    // user: process.env.POSTGRES_USER,
    // host: process.env.POSTGRES_HOST,
    // database: process.env.POSTGRES_DB,
    // password: process.env.POSTGRES_PASSWORD,
    // port: process.env.POSTGRES_PORT,
// });
// pgClient.on('error', () => console.log('Lost PG connection'));

// pgClient.query('SELECT NOW()', (err:any, res:any) => {
//   console.log(err, res)
//   pgClient.end()
// })

// pgClient
//   .query('CREATE TABLE IF NOT EXISTS values (number INT)')
//   .catch((err: any) => console.log(err));


// const { Pool, Client } = require('pg')
// const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DB,
//   port: process.env.POSTGRES_PORT,
// });
// pool.query('SELECT NOW()', (err: any, res: any) => {
//   console.log('err', err)
//   // console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   port: process.env.POSTGRES_PORT,
// })
// client.connect()
// client.query('SELECT NOW()', (err:any, res:any) => {
//   console.log(err, res)
//   client.end()
// })
// Postgres Client Setup

console.log('Works!!!!!!')

console.log('user', process.env.POSTGRES_USER)
console.log('host', process.env.POSTGRES_HOST)
console.log('database', process.env.POSTGRES_DB)
console.log('port', process.env.PORT)
const { Pool } = require('pg');
const pgClient = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.PORT
});


pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch((err:any) => console.log(err));
