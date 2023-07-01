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
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield (0, userModel_1.getUserIngredients)(res.locals.email);
    if (userData === 'Failed') {
        res.locals.data = [];
    }
    else {
        res.locals.data = userData.rows;
    }
    return next();
});
const insertRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = res.locals;
    const { ingredient, imagepath } = req.body;
    console.log('email', email);
    console.log('insert ingredients', ingredient);
    try {
        yield (0, userModel_1.insertUserIngredient)(email, ingredient, imagepath);
        console.log('inserted record to user ingredients');
        return next();
    }
    catch (e) {
        return { message: { err: 'Error updating the database' } };
    }
});
const deleteRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = res.locals;
    const { ingredient } = req.body;
    console.log('email', email);
    console.log('delete ingredients', ingredient);
    try {
        yield (0, userModel_1.deleteUserIngredient)(email, ingredient);
        console.log('inserted record to user ingredients');
        return next();
    }
    catch (e) {
        return { message: { err: 'Error updating the database' } };
    }
});
exports.default = {
    getData,
    insertRecord,
    deleteRecord,
};
