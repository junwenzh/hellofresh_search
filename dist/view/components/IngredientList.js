"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../hooks");
const IngredientCard_1 = __importDefault(require("./IngredientCard"));
function IngredientList() {
    const ingredients = (0, hooks_1.useAppSelector)(state => state.currentIngredients.ingredients);
    return (react_1.default.createElement("section", { className: "absolute top-10 z-0 px-8 md:px-0" },
        react_1.default.createElement("ul", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" }, ingredients.map(e => {
            return (react_1.default.createElement(IngredientCard_1.default, { name: e.name, imageUrl: e.imagepath, key: `list_${e.name}` }));
        }))));
}
exports.default = IngredientList;
