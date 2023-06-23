import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: 'hellofresh',
  max: 10,
});

export default async function (
  sql: string,
  params: any[]
): Promise<QueryResult<any>> {
  const client = await pool.connect();
  const results = await client.query(sql, params);
  client.release();
  return results;
}
