import { query } from "@/app/database/database";

export async function findUser(email: string) {
  const sql = "select * from users where email = $1";
  return await query(sql, [email]);
}

export async function insertLoginToken(email: string, token: string) {
  const sql = "insert into users (email, token) values ($1, $2)";
  return await query(sql, [email, token]);
}

export async function updateLoginToken(email: string, token: string) {
  const sql = "update users set token = $2 where email = $1";
  return await query(sql, [email, token]);
}
