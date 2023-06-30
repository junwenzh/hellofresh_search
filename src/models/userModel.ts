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
    console.log('Error running user model query');
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
  const sql =
    'select ingredient as name, imagepath from user_ingredients where email = $1';
  return await query(sql, [email]);
};

const insertUserIngredient = async (
  email: string,
  ingredient: string,
  imagepath: string
) => {
  const insertRecord = `insert into user_ingredients (email, ingredient, imagepath) values ($1, $2, $3)`;
  return await query(insertRecord, [email, ingredient, imagepath]);
};

const deleteUserIngredient = async (email: string, ingredient: string) => {
  const deleteRecord = `delete from user_ingredients where email = $1 and ingredient = $2`;
  return await query(deleteRecord, [email, ingredient]);
};

export {
  getUser,
  createLoginToken,
  updateLoginToken,
  getUserIngredients,
  insertUserIngredient,
  deleteUserIngredient,
};
