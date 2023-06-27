import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: 'users',
  max: 10,
});

async function query(sql: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const results = await client.query(sql, params);
    client.release();
    return results;
  } catch (e) {
    client.release();
    console.log(e);
    return 'Failed';
  }
}

const getUser = async (email: string) => {
  const sql = 'select * from users where email = $1';
  return await query(sql, [email]);
};

const createLoginToken = async (
  email: string,
  token: string,
  expiration: Date
) => {
  const sql =
    'insert into users (email, logintoken, loginexpire) values ($1, $2, $3)';
  return await query(sql, [email, token, expiration]);
};

const updateLoginToken = async (
  email: string,
  token: string,
  expiration: Date
) => {
  const sql =
    'update users set logintoken = $1, loginexpire = $2 where email = $3';
  return await query(sql, [token, expiration, email]);
};

export { getUser, createLoginToken, updateLoginToken };
