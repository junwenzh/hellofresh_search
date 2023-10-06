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
exports.deleteUserIngredient = exports.insertUserIngredient = exports.getUserIngredients = exports.updateLoginToken = exports.createLoginToken = exports.getUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: "localhost",
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    max: 10,
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
            console.log("Error running user model query");
            return "Failed";
        }
    });
}
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "select * from users where email = $1";
    return yield query(sql, [email]);
});
exports.getUser = getUser;
const createLoginToken = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "insert into users (email, token) values ($1, $2)";
    return yield query(sql, [email, token]);
});
exports.createLoginToken = createLoginToken;
const updateLoginToken = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "update users set token = $1 where email = $2";
    return yield query(sql, [token, email]);
});
exports.updateLoginToken = updateLoginToken;
const getUserIngredients = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "select ingredient as name, imagepath from user_ingredients where email = $1";
    return yield query(sql, [email]);
});
exports.getUserIngredients = getUserIngredients;
const insertUserIngredient = (email, ingredient, imagepath) => __awaiter(void 0, void 0, void 0, function* () {
    const insertRecord = `insert into user_ingredients (email, ingredient, imagepath) values ($1, $2, $3)`;
    return yield query(insertRecord, [email, ingredient, imagepath]);
});
exports.insertUserIngredient = insertUserIngredient;
const deleteUserIngredient = (email, ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteRecord = `delete from user_ingredients where email = $1 and ingredient = $2`;
    return yield query(deleteRecord, [email, ingredient]);
});
exports.deleteUserIngredient = deleteUserIngredient;
