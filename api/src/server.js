// Postgres Client Setup
const { Pool } = require('pg');

console.log('user:', process.env.POSTGRES_USER)
console.log('host:', process.env.POSTGRES_HOST)
console.log('database:', process.env.POSTGRES_DB)
console.log('password:', process.env.POSTGRES_PASSWORD)
console.log('port:', process.env.POSTGRES_PORT)
console.log()

const pgClient = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

console.log('gggggg')