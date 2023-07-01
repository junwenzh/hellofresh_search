"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAllIngredients = exports.allIngredientsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    ingredients: [],
};
exports.allIngredientsSlice = (0, toolkit_1.createSlice)({
    name: 'allingredients',
    initialState,
    reducers: {
        setAllIngredients: (state, action) => {
            state.ingredients = action.payload;
        },
    },
});
exports.setAllIngredients = exports.allIngredientsSlice.actions.setAllIngredients;
exports.default = exports.allIngredientsSlice.reducer;
