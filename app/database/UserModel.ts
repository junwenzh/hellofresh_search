import { query } from "@/app/database/database";

import { Results } from "@/app/database/types_database";

export async function findUser(email: string) {
  const sql = "select * from users where email = $1";
  return (await query(sql, [email])) as Results;
}

export async function insertLoginToken(email: string, token: string) {
  const sql = "insert into users (email, token) values ($1, $2)";
  return (await query(sql, [email, token])) as Results;
}

export async function updateLoginToken(email: string, token: string) {
  const sql = "update users set token = $2 where email = $1";
  return (await query(sql, [email, token])) as Results;
}

export async function getUserIngredients(email: string) {
  const sql =
    "select ingredient, imagepath from user_ingredients where email = $1";
  return (await query(sql, [email])) as Results;
}
