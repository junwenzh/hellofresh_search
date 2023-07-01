"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRecipes = exports.recipesSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = [];
exports.recipesSlice = (0, toolkit_1.createSlice)({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            return (state = action.payload);
        },
    },
});
exports.setRecipes = exports.recipesSlice.actions.setRecipes;
exports.default = exports.recipesSlice.reducer;
