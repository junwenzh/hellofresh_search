"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: process.env.PG_URL,
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    max: 10,
});
const rawSql = (sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    const results = yield client.query(sql, params);
    client.release();
    return results;
});
const insertRecipe = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into recipes values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
    return query(sql, params);
});
const insertIngredient = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into ingredients values ($1, $2, $3, $4, $5)";
    return query(sql, params);
});
const insertRecipeIngredient = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into recipe_ingredients values ($1, $2)";
    return query(sql, params);
});
const insertRecipeYield = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into recipe_yields values ($1, $2, $3, $4)";
    return query(sql, params);
});
const insertRecipeStep = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into recipe_steps values ($1, $2, $3, $4)";
    return query(sql, params);
});
const insertRecipeCuisine = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into recipe_cuisines values ($1, $2)";
    return query(sql, params);
});
const insertRecipeTag = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into recipe_tags values ($1, $2)";
    return query(sql, params);
});
const queryCuisines = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "select cuisine from recipe_cuisines where recipe_id = $1 order by cuisine";
    return query(sql, [id]);
});
const queryTags = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "select tag from recipe_tags where recipe_id = $1 order by tag";
    return query(sql, [id]);
});
const queryIngredients = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    select  b.name, b.imagepath, c.amount, c.unit
    from    recipe_ingredients a
    join    ingredients b on a.ingredient_id = b.id
    left join recipe_yields c on a.recipe_id = c.recipe_id and a.ingredient_id = c.ingredient_id
    where   a.recipe_id = $1;
  `;
    return query(sql, [id]);
});
const querySteps = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "select step, ingredients, instructions from recipe_steps where recipe_id = $1 order by step";
    return query(sql, [id]);
});
const queryAllIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    select  name, max(imagepath) imagepath, sum(recipe_count) recipe_count
    from    ingredients
    group by name
    order by recipe_count desc
  `;
    return query(sql, []);
});
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const results = yield client.query(sql, params);
            client.release();
            return results;
        }
        catch (e) {
            client.release();
            console.log("Error running recipe model query");
            return "Failed";
        }
    });
}
exports.default = {
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
