"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../hooks");
const RecipeCard_1 = __importDefault(require("./RecipeCard"));
function RecipeList() {
    const recipes = (0, hooks_1.useAppSelector)(state => state.receipes);
    return (react_1.default.createElement("main", { className: "flex flex-col items-center max-w-3xl mx-auto my-12 " },
        react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "my-4 text-2xl font-medium text-gray-600" }, "Back to home"),
        react_1.default.createElement("p", { className: "text-gray-700 my-8" }, "Click on the card to expand"),
        recipes.map(recipe => (react_1.default.createElement("div", { key: recipe.id },
            react_1.default.createElement(RecipeCard_1.default, { recipe: recipe, key: recipe.id }))))));
}
exports.default = RecipeList;
