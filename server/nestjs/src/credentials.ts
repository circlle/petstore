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
  username: 'root',
  password: '123456',
  port: 3306,
};

export default credential;
