import { Pool, QueryResult } from 'pg';
import {
  DbRecipe,
  DbIngredient,
  DbRecipeIngredient,
  DbRecipeYield,
  DbRecipeStep,
  DbRecipeCuisine,
  DbRecipeTag,
} from '../types/DbTypes';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: 'hellofresh',
  max: 10,
});

const rawSql = async (
  sql: string,
  params?: string[]
): Promise<QueryResult<any>> => {
  const client = await pool.connect();
  const results = await client.query(sql, params);
  client.release();
  return results;
};

// take a Recipe object and insert into recipe table
const insertRecipe = async (params: DbRecipe) => {
  const sql =
    'insert into recipes values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';
  return query(sql, params);
};

const insertIngredient = async (params: DbIngredient) => {
  const sql = 'insert into ingredients values ($1, $2, $3, $4, $5)';
  return query(sql, params);
};

const insertRecipeIngredient = async (params: DbRecipeIngredient) => {
  const sql = 'insert into recipe_ingredients values ($1, $2)';
  return query(sql, params);
};

const insertRecipeYield = async (params: DbRecipeYield) => {
  const sql = 'insert into recipe_yields values ($1, $2, $3, $4)';
  return query(sql, params);
};

const insertRecipeStep = async (params: DbRecipeStep) => {
  const sql = 'insert into recipe_steps values ($1, $2, $3, $4)';
  return query(sql, params);
};

const insertRecipeCuisine = async (params: DbRecipeCuisine) => {
  const sql = 'insert into recipe_cuisines values ($1, $2)';
  return query(sql, params);
};

const insertRecipeTag = async (params: DbRecipeTag) => {
  const sql = 'insert into recipe_tags values ($1, $2)';
  return query(sql, params);
};

async function query(sql: string, params: any[]) {
  const client = await pool.connect();
  try {
    await client.query(sql, params);
    client.release();
    return 'Success';
  } catch (e) {
    client.release();
    console.log(e);
    return 'Failed';
  }
}

export default {
  rawSql,
  insertRecipe,
  insertIngredient,
  insertRecipeIngredient,
  insertRecipeYield,
  insertRecipeStep,
  insertRecipeCuisine,
  insertRecipeTag,
};
