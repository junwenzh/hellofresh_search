"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const allIngredientsSlice_1 = __importDefault(require("./slices/allIngredientsSlice"));
const currentIngredientsSlice_1 = __importDefault(require("./slices/currentIngredientsSlice"));
const optionsSlice_1 = __importDefault(require("./slices/optionsSlice"));
const inputSlice_1 = __importDefault(require("./slices/inputSlice"));
const recipesSlice_1 = __importDefault(require("./slices/recipesSlice"));
const authenticatedSlice_1 = __importDefault(require("./slices/authenticatedSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        allIngredients: allIngredientsSlice_1.default,
        currentIngredients: currentIngredientsSlice_1.default,
        options: optionsSlice_1.default,
        inputText: inputSlice_1.default,
        receipes: recipesSlice_1.default,
        authenticated: authenticatedSlice_1.default,
    },
});
