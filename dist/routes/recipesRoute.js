"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipesController_1 = __importDefault(require("../controllers/recipesController"));
const router = (0, express_1.Router)();
router.post('/findmatches', recipesController_1.default.getRecipes, recipesController_1.default.getAdditionalData, (req, res) => {
    return res.status(200).json(res.locals.recipes);
});
router.get('/allingredients', recipesController_1.default.getAllIngredients, (req, res) => {
    return res.status(200).json(res.locals.allIngredients);
});
exports.default = router;
