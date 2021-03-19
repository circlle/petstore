import { config as dotConfig } from 'dotenv';
dotConfig();

export type Credential = {
  host: string;
  database: string;
  username: string;
  password: string;
  port: number;
};

const credential: Credential = {
  host: process.env.DB_HOST || 'localhost',
  database: 'petstore',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  port: 3306,
};

export default credential;
