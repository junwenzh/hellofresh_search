"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeIngredient = exports.addIngredient = exports.setCurrentIngredients = exports.currentIngredientsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    ingredients: [],
};
exports.currentIngredientsSlice = (0, toolkit_1.createSlice)({
    name: 'currentingredients',
    initialState,
    reducers: {
        setCurrentIngredients: (state, action) => {
            state.ingredients = action.payload;
        },
        addIngredient: (state, action) => {
            state.ingredients.unshift(action.payload);
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(e => e.name !== action.payload.name);
        },
    },
});
_a = exports.currentIngredientsSlice.actions, exports.setCurrentIngredients = _a.setCurrentIngredients, exports.addIngredient = _a.addIngredient, exports.removeIngredient = _a.removeIngredient;
exports.default = exports.currentIngredientsSlice.reducer;
