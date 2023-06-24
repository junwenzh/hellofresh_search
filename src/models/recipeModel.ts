import { Pool, QueryResult } from 'pg';
import Recipe from '../classes/Recipe';

type DbRecipe = [
  id: string,
  name: string,
  category: string | null,
  difficulty: number | null,
  calories: number | null,
  preptime: number | null,
  totaltime: number | null,
  ratingscount: number | null,
  averagerating: number | null
];

type DbIngredient = [id: number, name: string];

type DbRecipeIngredient = [recipe_id: string, ingredient_id: number];

type DbSteps = [recipe_id: string, index: number, instructions: string];

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: 'hellofresh',
  max: 10,
});

const recipeModel: {
  [key: string]: any;
  rawSql?: (sql: string, params: any[]) => Promise<QueryResult<any>>;
  insertRecipe?: (recipe: Recipe) => Promise<string>;
  insertIngredient?: (id: number, name: string) => Promise<string>;
  insertRecipeIngredients?: (
    recipeId: string,
    ingredientId: number
  ) => Promise<string>;
  insertSteps?: (
    recipeId: string,
    step: number,
    description: string
  ) => Promise<string>;
} = {};

recipeModel.rawSql = async (sql, params): Promise<QueryResult<any>> => {
  const client = await pool.connect();
  const results = await client.query(sql, params);
  client.release();
  return results;
};

// take a Recipe object and insert into recipe table
recipeModel.insertRecipe = async recipe => {
  const sql = 'insert into recipes values ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  const params: DbRecipe = [
    recipe.id,
    recipe.name,
    recipe.category,
    recipe.difficulty,
    recipe.calories,
    recipe.prepTime,
    recipe.totalTime,
    recipe.ratingsCount,
    recipe.averageRating,
  ];
  return query(sql, params);
};
recipeModel.insertIngredient = async (id, name) => {
  const sql = 'insert into ingredients values ($1, $2)';
  const params: DbIngredient = [id, name];
  return query(sql, params);
};

recipeModel.insertRecipeIngredients = async (recipeId, ingredientId) => {
  const sql = 'insert into recipe_ingredients values ($1, $2)';
  const params: DbRecipeIngredient = [recipeId, ingredientId];
  return query(sql, params);
};

recipeModel.insertSteps = async (recipeId, index, instructions) => {
  const sql = 'insert into recipe_steps values ($1, $2, $3)';
  const params: DbSteps = [recipeId, index, instructions];
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

export default recipeModel;
