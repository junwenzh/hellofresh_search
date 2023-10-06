import dotenv from "dotenv";
import { Pool, QueryResult } from "pg";
import {
  DbRecipe,
  DbIngredient,
  DbRecipeIngredient,
  DbRecipeYield,
  DbRecipeStep,
  DbRecipeCuisine,
  DbRecipeTag,
} from "../types/DbTypes";

dotenv.config();

const pool = new Pool({
  host: process.env.PG_URL,
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  max: 10,
});

const rawSql = async (
  sql: string,
  params?: string[],
): Promise<QueryResult<any>> => {
  const client = await pool.connect();
  const results = await client.query(sql, params);
  client.release();
  return results;
};

// take a Recipe object and insert into recipe table
const insertRecipe = async (params: DbRecipe) => {
  const sql =
    "insert into recipes values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
  return query(sql, params);
};

const insertIngredient = async (params: DbIngredient) => {
  const sql = "insert into ingredients values ($1, $2, $3, $4, $5)";
  return query(sql, params);
};

const insertRecipeIngredient = async (params: DbRecipeIngredient) => {
  const sql = "insert into recipe_ingredients values ($1, $2)";
  return query(sql, params);
};

const insertRecipeYield = async (params: DbRecipeYield) => {
  const sql = "insert into recipe_yields values ($1, $2, $3, $4)";
  return query(sql, params);
};

const insertRecipeStep = async (params: DbRecipeStep) => {
  const sql = "insert into recipe_steps values ($1, $2, $3, $4)";
  return query(sql, params);
};

const insertRecipeCuisine = async (params: DbRecipeCuisine) => {
  const sql = "insert into recipe_cuisines values ($1, $2)";
  return query(sql, params);
};

const insertRecipeTag = async (params: DbRecipeTag) => {
  const sql = "insert into recipe_tags values ($1, $2)";
  return query(sql, params);
};

const queryCuisines = async (id: string) => {
  const sql =
    "select cuisine from recipe_cuisines where recipe_id = $1 order by cuisine";
  return query(sql, [id]);
};

const queryTags = async (id: string) => {
  const sql = "select tag from recipe_tags where recipe_id = $1 order by tag";
  return query(sql, [id]);
};

const queryIngredients = async (id: string) => {
  const sql = `
    select  b.name, b.imagepath, c.amount, c.unit
    from    recipe_ingredients a
    join    ingredients b on a.ingredient_id = b.id
    left join recipe_yields c on a.recipe_id = c.recipe_id and a.ingredient_id = c.ingredient_id
    where   a.recipe_id = $1;
  `;
  return query(sql, [id]);
};

const querySteps = async (id: string) => {
  const sql =
    "select step, ingredients, instructions from recipe_steps where recipe_id = $1 order by step";
  return query(sql, [id]);
};

const queryAllIngredients = async () => {
  const sql = `
    select  name, max(imagepath) imagepath, sum(recipe_count) recipe_count
    from    ingredients
    group by name
    order by recipe_count desc
  `;
  return query(sql, []);
};

async function query(sql: string, params: any[]) {
  const client = await pool.connect();
  try {
    const results = await client.query(sql, params);
    client.release();
    return results;
  } catch (e) {
    client.release();
    console.log("Error running recipe model query");
    return "Failed";
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
  queryCuisines,
  queryIngredients,
  querySteps,
  queryTags,
  queryAllIngredients,
};
