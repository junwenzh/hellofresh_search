// Get all ingredients
// Add ingredient to user
// Delete ingredient from user

import { query } from "@/app/database/database";

import { Results } from "@/app/database/types_database";

export async function getAllIngredients() {
  const sql =
    "select id, name, imagepath from (select id, name, imagepath, ROW_NUMBER()OVER(partition by name order by imagepath desc) as row_number from ingredients) t where t.row_number = 1";
  // "select distinct on (name) name, imagepath from ingredients order by imagepath desc";
  return (await query(sql)) as Results;
}

export async function getUserIngredients(email: string) {
  const sql = "select ingredient, imagepath from user_ingredients";
  return (await query(sql, [email])) as Results;
}

export async function addUserIngredient(
  email: string,
  ingredient: string,
  imagepath: string
) {
  const sql =
    "insert into user_ingredients (email, ingredient, imagepath) values ($1, $2, $3)";
  return (await query(sql, [email, ingredient, imagepath])) as Results;
}

export async function deleteUserIngredient(email: string, ingredient: string) {
  const sql =
    "delete from user_ingredients where email = $1 and ingredient = $2";
  return (await query(sql, [email, ingredient])) as Results;
}
