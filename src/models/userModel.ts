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

const createLoginToken = async (email: string, token: string) => {
  const sql = 'insert into users (email, token) values ($1, $2)';
  return await query(sql, [email, token]);
};

const updateLoginToken = async (email: string, token: string) => {
  const sql = 'update users set token = $1 where email = $2';
  return await query(sql, [token, email]);
};

const getUserIngredients = async (email: string) => {
  const sql = 'select ingredient from user_ingredients where email = $1';
  return await query(sql, [email]);
};

const updateUserIngredients = async (email: string, ingredients: string[]) => {
  const deleteRecords = 'delete from user_ingredients where email = $1';
  await query(deleteRecords, [email]);
  const vals = ingredients.map(e => `('${email}','${e}')`).join(',');
  const insertRecords =
    'insert into user_ingredients (email, ingredient) values $1';
  return await query(insertRecords, [vals]);
};

export {
  getUser,
  createLoginToken,
  updateLoginToken,
  getUserIngredients,
  updateUserIngredients,
};
