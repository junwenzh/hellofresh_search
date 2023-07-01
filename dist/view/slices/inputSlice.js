"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setText = exports.inputSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    text: '',
};
exports.inputSlice = (0, toolkit_1.createSlice)({
    name: 'inputtext',
    initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload;
        },
    },
});
exports.setText = exports.inputSlice.actions.setText;
exports.default = exports.inputSlice.reducer;
