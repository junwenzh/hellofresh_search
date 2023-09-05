import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: "users",
  max: 10,
});

export async function query(sql: string, params?: any[]) {
  const client = await pool.connect();
  let results;
  try {
    results = await client.query(sql, params);
  } catch (e) {
    console.log("Error running query", e);
    results = e;
  } finally {
    client.release();
    return results;
  }
}
