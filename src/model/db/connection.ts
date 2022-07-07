import { config } from "dotenv";
import { createPool, Pool, PoolOptions } from 'mysql2/promise';

config();

export const dbConfig: PoolOptions  = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT)
}

const connection: Pool = createPool({...dbConfig});

export default connection;
