"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOptions = exports.optionsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    options: [],
};
exports.optionsSlice = (0, toolkit_1.createSlice)({
    name: 'options',
    initialState,
    reducers: {
        setOptions: (state, action) => {
            state.options = action.payload;
        },
    },
});
exports.setOptions = exports.optionsSlice.actions.setOptions;
exports.default = exports.optionsSlice.reducer;
